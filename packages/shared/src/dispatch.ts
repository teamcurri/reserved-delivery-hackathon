import type { DispatchPriority, DriverBlend } from './types'

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
 */
export type DriverDispatch =
  | { type: 'driver:setBlend'; payload: DriverBlend }
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
