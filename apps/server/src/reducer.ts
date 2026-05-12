import { nanoid } from 'nanoid'
import {
  type AppDispatch,
  type Blast,
  type ClientInfo,
  type Delivery,
  type DispatchEvent,
  type DispatchPriority,
  type DriverEntry,
  type Session,
  type SessionState,
  CLAIM_WINDOW_MS,
  SD_CENTER,
  driverScore,
  initialBlend,
} from '@hackathon/shared'

export type ReduceContext = {
  by?: ClientInfo
  session: Session
}

/**
 * Pure reducer. Pick "best driver" / "next driver" decisions live here so the
 * scoring policy is a single replaceable function.
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
      const ranked = rankDrivers(ctx.session, state)
      if (ranked.length === 0) return state
      const delivery: Delivery = {
        id: nanoid(8),
        pickup: e.payload.pickup,
        dropoff: e.payload.dropoff,
        priority: e.payload.priority,
        createdAt: Date.now(),
      }
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

/**
 * After a blast resolves (reject or expire), decide what happens next.
 * - Quality path: pick the next-best unblasted driver, blast them.
 * - Speed path: keep waiting until all outstanding blasts resolve.
 * If no work remains, drop to idle so the desktop can restart.
 */
function advanceBlasting(state: SessionState, ctx: ReduceContext, blasts: Blast[]): SessionState {
  const priority = state.delivery?.priority
  if (priority === 'quality') {
    const blastedIds = new Set(blasts.map((b) => b.driverId))
    const ranked = rankDrivers(ctx.session, state).filter((r) => !blastedIds.has(r.clientId))
    const next = ranked[0]
    if (next) {
      const now = Date.now()
      blasts = [
        ...blasts,
        {
          blastId: nanoid(8),
          driverId: next.clientId,
          blastedAt: now,
          expiresAt: now + CLAIM_WINDOW_MS,
          outcome: 'pending',
          reserved: true,
        },
      ]
      return { ...state, blasts }
    }
    return { ...state, status: 'idle', blasts }
  }

  // Speed path: idle out only when nothing is still pending.
  const anyPending = blasts.some((b) => b.outcome === 'pending')
  if (!anyPending) {
    return { ...state, status: 'idle', blasts }
  }
  return { ...state, blasts }
}

type RankedDriver = { clientId: string; score: number }

function rankDrivers(session: Session, state: SessionState): RankedDriver[] {
  return session.clients
    .filter((c) => c.role === 'mobile')
    .map((c) => {
      const blend = state.drivers[c.clientId]?.blend ?? initialBlend()
      return { clientId: c.clientId, score: driverScore(blend) }
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
  return ranked.map((r) => ({
    blastId: nanoid(8),
    driverId: r.clientId,
    blastedAt: now,
    expiresAt: now + CLAIM_WINDOW_MS,
    outcome: 'pending',
    reserved: false,
  }))
}
