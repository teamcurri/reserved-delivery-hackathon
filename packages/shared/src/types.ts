export type Identity = {
  name: string
}

/**
 * - `parent`: the dispatch console. One per session — issues delivery:* events.
 * - `mobile`: a driver. Many per session.
 * - `spectator`: read-only viewer (e.g. the QR/presentation screen). Many per
 *   session. Receives state pushes but is not in the driver list and is not
 *   subject to the single-parent constraint.
 */
export type ClientRole = 'parent' | 'mobile' | 'spectator'

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
  pickupLatLng: LatLng
  dropoff: string
  dropoffLatLng: LatLng
  priority: DispatchPriority
  createdAt: number
  /** Total payout offered to the driver, in USD. */
  price: number
  /** Approximate total trip distance (pickup → dropoff) in miles. */
  totalDistanceMi: number
  /** Personal protective equipment required for the load, e.g. ['Gloves']. */
  ppe: string[]
  /** Count of distinct items / parcels in the load. */
  totalItems: number
  /** Approximate total weight of the load in pounds. */
  totalWeightLbs: number
  /** Short human-readable description of the cargo. */
  description: string
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
  /** 0..1 reaction-time-derived probability they accept a blast. */
  accept: number
  /** 0..1 quiz-derived delivery quality. */
  quality: number
}

export type LatLng = { lat: number; lng: number }

export type OnboardingStep =
  | 'name'
  | 'quiz:box'
  | 'quiz:seatbelt'
  | 'quiz:school-zone'
  | 'quiz:mom'
  | 'reaction'
  | 'done'

export type QuizAnswers = {
  box?: 'box' | 'fox'
  seatbelt?: boolean
  schoolZoneMph?: number
  mom?: boolean
  reactionMs?: number
}

export type DriverOnboarding = {
  step: OnboardingStep
  answers: QuizAnswers
}

export type DriverEntry = {
  blend: DriverBlend
  location: LatLng
  onboarding?: DriverOnboarding
}

export type SessionState = {
  status: DeliveryStatus
  delivery?: Delivery
  blasts: Blast[]
  fulfilledBy?: { clientId: string; identity?: Identity }
  drivers: Record<string, DriverEntry>
  lastWebhook?: { source: string; payload: unknown; at: number }
}

export type Session = {
  id: string
  createdAt: number
  state: SessionState
  clients: ClientInfo[]
}

export const initialBlend = (): DriverBlend => ({
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
 *
 * Distance is intentionally not in the formula yet — it's a display value.
 * Replacing this with a distance-aware ranking is the clean follow-up.
 */
export function driverScore(blend: DriverBlend): number {
  return blend.accept * 0.5 + blend.quality * 0.5
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
