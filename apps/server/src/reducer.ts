import { nanoid } from 'nanoid'
import {
  type AppDispatch,
  type Blast,
  type ClientInfo,
  type Delivery,
  type DeliveryDispatchPayload,
  type DispatchEvent,
  type DispatchPriority,
  type DriverEntry,
  type LatLng,
  type Session,
  type SessionState,
  BALANCED_WAVE_SIZE,
  CLAIM_WINDOW_MS,
  QUALITY_FALLBACK_WAVE_SIZE,
  SD_CENTER,
  SPEED_WAVE_SIZE,
  initialBlend,
  tierScore,
} from '@hackathon/shared'

export type ReduceContext = {
  by?: ClientInfo
  session: Session
}

/**
 * Pure reducer. Pick "best driver" / "next driver" decisions live here so the
 * scoring policy is a single replaceable function (see `tierScore`).
 */
export function reduce(
  state: SessionState,
  event: DispatchEvent,
  ctx: ReduceContext,
): SessionState {
  const e = event as AppDispatch

  switch (e.type) {
    case 'driver:setBlend': {
      const driverId = ctx.by?.clientId
      if (!driverId) return state
      const prev = state.drivers[driverId]
      const next: DriverEntry = {
        blend: e.payload.blend,
        location: e.payload.location,
        onboarding: prev?.onboarding,
      }
      return { ...state, drivers: { ...state.drivers, [driverId]: next } }
    }

    case 'driver:onboarding': {
      const driverId = ctx.by?.clientId
      if (!driverId) return state
      const prev = state.drivers[driverId]
      const next: DriverEntry = {
        blend: prev?.blend ?? initialBlend(),
        location: prev?.location ?? SD_CENTER,
        onboarding: e.payload,
      }
      return { ...state, drivers: { ...state.drivers, [driverId]: next } }
    }

    case 'delivery:dispatch': {
      if (state.status !== 'idle') return state
      const ranked = rankDrivers(
        ctx.session,
        state,
        e.payload.priority,
        e.payload.pickupLatLng,
      )
      if (ranked.length === 0) return state
      const delivery: Delivery = buildDelivery(e.payload)
      const blasts = makeInitialBlasts(ranked, e.payload.priority)
      return { ...state, status: 'blasting', delivery, blasts }
    }

    case 'delivery:claim': {
      if (state.status !== 'blasting') return state
      const driverId = ctx.by?.clientId
      if (!driverId) return state
      const target = state.blasts.find(
        (b) => b.blastId === e.payload.blastId && b.driverId === driverId && b.outcome === 'pending',
      )
      if (!target) return state
      const blasts = state.blasts.map((b): Blast => {
        if (b.blastId === target.blastId) return { ...b, outcome: 'accepted' }
        if (b.outcome === 'pending') return { ...b, outcome: 'expired' }
        return b
      })
      return {
        ...state,
        status: 'fulfilled',
        blasts,
        fulfilledBy: { clientId: driverId, identity: ctx.by?.identity },
      }
    }

    case 'delivery:reject': {
      if (state.status !== 'blasting') return state
      const driverId = ctx.by?.clientId
      if (!driverId) return state
      const target = state.blasts.find(
        (b) => b.blastId === e.payload.blastId && b.driverId === driverId && b.outcome === 'pending',
      )
      if (!target) return state
      const blasts = state.blasts.map((b): Blast =>
        b.blastId === target.blastId ? { ...b, outcome: 'rejected' } : b,
      )
      return advanceBlasting(state, ctx, blasts)
    }

    case 'blast:expire': {
      if (state.status !== 'blasting') return state
      const target = state.blasts.find(
        (b) => b.blastId === e.payload.blastId && b.outcome === 'pending',
      )
      if (!target) return state
      const blasts = state.blasts.map((b): Blast =>
        b.blastId === target.blastId ? { ...b, outcome: 'expired' } : b,
      )
      return advanceBlasting(state, ctx, blasts)
    }

    case 'delivery:restart': {
      return {
        status: 'idle',
        blasts: [],
        drivers: state.drivers,
      }
    }
  }

  // Webhook envelope — surfaces last payload to the UI for debugging.
  if (event.type.startsWith('webhook:')) {
    return {
      ...state,
      lastWebhook: {
        source: event.type.slice('webhook:'.length),
        payload: event.payload,
        at: Date.now(),
      },
    }
  }

  return state
}

function buildDelivery(payload: DeliveryDispatchPayload): Delivery {
  return {
    id: nanoid(8),
    pickup: payload.pickup,
    pickupLatLng: payload.pickupLatLng,
    dropoff: payload.dropoff,
    dropoffLatLng: payload.dropoffLatLng,
    priority: payload.priority,
    createdAt: Date.now(),
    price: payload.price,
    totalDistanceMi: payload.totalDistanceMi,
    ppe: [...payload.ppe],
    totalItems: payload.totalItems,
    totalWeightLbs: payload.totalWeightLbs,
    description: payload.description,
  }
}

/**
 * Called when a blast resolves (reject or expire). All priorities follow the
 * same shape: wait for the current wave to fully resolve, then launch the
 * next wave of size N for the tier. If no unblasted drivers remain, idle
 * out so the desktop can restart.
 *
 * - quality: initial wave is 1 reserved driver; fallback waves are
 *   QUALITY_FALLBACK_WAVE_SIZE (2) non-reserved.
 * - balanced: BALANCED_WAVE_SIZE (3) non-reserved per wave.
 * - speed:   SPEED_WAVE_SIZE (4) non-reserved per wave.
 */
function advanceBlasting(state: SessionState, ctx: ReduceContext, blasts: Blast[]): SessionState {
  const delivery = state.delivery
  if (!delivery) return { ...state, status: 'idle', blasts }

  // Wait for the current wave to fully resolve before launching the next.
  if (blasts.some((b) => b.outcome === 'pending')) {
    return { ...state, blasts }
  }

  const waveSize = fallbackWaveSize(delivery.priority)
  const blastedIds = new Set(blasts.map((b) => b.driverId))
  const ranked = rankDrivers(
    ctx.session,
    state,
    delivery.priority,
    delivery.pickupLatLng,
  ).filter((r) => !blastedIds.has(r.clientId))
  const wave = ranked.slice(0, waveSize)

  if (wave.length === 0) {
    return { ...state, status: 'idle', blasts }
  }

  const now = Date.now()
  const next: Blast[] = wave.map((r) => ({
    blastId: nanoid(8),
    driverId: r.clientId,
    blastedAt: now,
    expiresAt: now + CLAIM_WINDOW_MS,
    outcome: 'pending',
    // Fallback waves (including quality's wave-of-2) are open blasts —
    // first claim wins. The reserved 30s slot only applied to quality's
    // initial single-driver blast.
    reserved: false,
  }))
  return { ...state, blasts: [...blasts, ...next] }
}

function fallbackWaveSize(priority: DispatchPriority): number {
  if (priority === 'quality') return QUALITY_FALLBACK_WAVE_SIZE
  if (priority === 'balanced') return BALANCED_WAVE_SIZE
  return SPEED_WAVE_SIZE
}

type RankedDriver = { clientId: string; score: number }

function rankDrivers(
  session: Session,
  state: SessionState,
  priority: DispatchPriority,
  pickup: LatLng,
): RankedDriver[] {
  return session.clients
    .filter((c) => c.role === 'mobile')
    .map((c) => {
      const entry = state.drivers[c.clientId]
      const blend = entry?.blend ?? initialBlend()
      const location = entry?.location ?? SD_CENTER
      return {
        clientId: c.clientId,
        score: tierScore(blend, location, pickup, priority),
      }
    })
    .sort((a, b) => b.score - a.score)
}

function makeInitialBlasts(ranked: RankedDriver[], priority: DispatchPriority): Blast[] {
  const now = Date.now()
  if (priority === 'quality') {
    const top = ranked[0]
    if (!top) return []
    return [
      {
        blastId: nanoid(8),
        driverId: top.clientId,
        blastedAt: now,
        expiresAt: now + CLAIM_WINDOW_MS,
        outcome: 'pending',
        reserved: true,
      },
    ]
  }
  const waveSize = priority === 'balanced' ? BALANCED_WAVE_SIZE : SPEED_WAVE_SIZE
  const wave = ranked.slice(0, waveSize)
  return wave.map((r) => ({
    blastId: nanoid(8),
    driverId: r.clientId,
    blastedAt: now,
    expiresAt: now + CLAIM_WINDOW_MS,
    outcome: 'pending',
    reserved: false,
  }))
}
