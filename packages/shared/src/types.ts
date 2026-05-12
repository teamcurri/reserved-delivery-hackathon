export type Identity = {
  name: string
}

export type ClientRole = 'parent' | 'mobile'

export type ClientInfo = {
  clientId: string
  role: ClientRole
  identity?: Identity
  joinedAt: number
}

export type DispatchPriority = 'speed' | 'quality' | 'balanced'

export type DeliveryStatus = 'idle' | 'blasting' | 'fulfilled'

export type BlastOutcome = 'pending' | 'rejected' | 'expired' | 'accepted'

export type Delivery = {
  id: string
  pickup: string
  dropoff: string
  priority: DispatchPriority
  createdAt: number
}

export type Blast = {
  blastId: string
  driverId: string
  blastedAt: number
  expiresAt: number
  outcome: BlastOutcome
  /**
   * Quality path blasts a single reserved offer at a time (the "30s claim
   * window"). Speed path blasts all drivers in a wave with reserved=false —
   * first claim wins.
   */
  reserved: boolean
}

export type DriverBlend = {
  /** 0..1 self-reported proximity. higher = closer. */
  distance: number
  /** 0..1 self-reported probability they accept a blast. */
  accept: number
  /** 0..1 self-reported delivery quality. */
  quality: number
}

export type SessionState = {
  status: DeliveryStatus
  delivery?: Delivery
  blasts: Blast[]
  fulfilledBy?: { clientId: string; identity?: Identity }
  drivers: Record<string, DriverBlend>
  lastWebhook?: { source: string; payload: unknown; at: number }
}

export type Session = {
  id: string
  createdAt: number
  state: SessionState
  clients: ClientInfo[]
}

export const initialBlend = (): DriverBlend => ({
  distance: 0.5,
  accept: 0.5,
  quality: 0.5,
})

export const initialSessionState = (): SessionState => ({
  status: 'idle',
  blasts: [],
  drivers: {},
})

/**
 * Single source of truth for driver scoring. Used by:
 *  - the server reducer when picking the next quality-path driver
 *  - desktop UI to display the "efficiency score" of pinged drivers
 */
export function driverScore(blend: DriverBlend): number {
  return blend.accept * 0.5 + blend.quality * 0.5
}

/**
 * Conventional display value derived from the self-reported proximity blend.
 * Pure UI helper — not used by the reducer.
 */
export function approxMiles(blend: DriverBlend): number {
  return Math.round((1 - blend.distance) * 5 * 10) / 10
}

export const CLAIM_WINDOW_MS = 30_000

/**
 * Number of drivers blasted in parallel per wave on the `balanced` priority.
 * Tunable knob between `quality` (1 at a time) and `speed` (everyone at once).
 */
export const BALANCED_WAVE_SIZE = 3

/**
 * Generic event envelope used over Socket.IO. See dispatch.ts for the typed
 * payload union.
 */
export type DispatchEvent = {
  type: string
  payload?: unknown
}
