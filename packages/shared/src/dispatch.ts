import type {
  DispatchPriority,
  DriverBlend,
  DriverOnboarding,
  LatLng,
} from './types'

/**
 * Events the desktop ("parent") can dispatch. Keep this union the contract
 * between desktop UI and the server reducer — adding a new desktop action
 * means adding a variant here and a case in the reducer.
 */
export type DesktopDispatch =
  | {
      type: 'delivery:dispatch'
      payload: { pickup: string; dropoff: string; priority: DispatchPriority }
    }
  | { type: 'delivery:restart' }

/**
 * Events a mobile driver can dispatch.
 *
 * `driver:onboarding` streams onboarding-progress snapshots while the driver
 * walks the quiz / reaction-test flow. `driver:setBlend` is the final
 * "publish my profile" event sent once at the end (and on a restore-from-
 * localStorage join), carrying both the score blend and the rolled
 * San Diego location.
 */
export type DriverDispatch =
  | { type: 'driver:setBlend'; payload: { blend: DriverBlend; location: LatLng } }
  | { type: 'driver:onboarding'; payload: DriverOnboarding }
  | { type: 'delivery:claim'; payload: { blastId: string } }
  | { type: 'delivery:reject'; payload: { blastId: string } }

/**
 * Events the server emits to itself (e.g. blast expiry timers).
 */
export type ServerDispatch = { type: 'blast:expire'; payload: { blastId: string } }

export type AppDispatch = DesktopDispatch | DriverDispatch | ServerDispatch

/** Type guard for narrowing AppDispatch by type field. */
export function isDispatch<T extends AppDispatch['type']>(
  event: { type: string },
  type: T,
): event is Extract<AppDispatch, { type: T }> {
  return event.type === type
}
