import type { DispatchPriority, DriverBlend, LatLng } from './types'
import { haversineMiles } from './onboarding'

/**
 * Drivers beyond this radius from the pickup get proximity = 0 in the
 * ranking. Tuned for the San Diego demo (drivers live within ~5mi of the
 * center, so a 10mi window covers the worst pairing).
 */
export const PROXIMITY_MAX_MILES = 10

/**
 * Wave sizes per priority tier — how many drivers are blasted in parallel
 * on each round.
 *
 * - Quality starts with 1 (reserved) and falls back to waves of
 *   `QUALITY_FALLBACK_WAVE_SIZE`.
 * - Balanced uses `BALANCED_WAVE_SIZE` per wave.
 * - Speed uses `SPEED_WAVE_SIZE` per wave.
 */
export const SPEED_WAVE_SIZE = 4
export const QUALITY_FALLBACK_WAVE_SIZE = 2

/**
 * Per-tier weighting of the three driver dimensions. All tiers blend the
 * same three signals — only the weights differ.
 *
 * - Speed: accept × proximity (no quality).
 * - Quality: equal blend of accept × proximity × quality.
 * - Balanced: midpoint (mean) of the speed and quality weight vectors.
 */
export const SCORING_WEIGHTS: Record<
  DispatchPriority,
  { accept: number; proximity: number; quality: number }
> = {
  speed: { accept: 0.5, proximity: 0.5, quality: 0 },
  quality: { accept: 1 / 3, proximity: 1 / 3, quality: 1 / 3 },
  // Mean of speed and quality vectors: ((0.5 + 1/3)/2 = 5/12, same, (0 + 1/3)/2 = 1/6)
  balanced: { accept: 5 / 12, proximity: 5 / 12, quality: 1 / 6 },
}

/**
 * 0..1 proximity score — 1 means driver is at the pickup, 0 means
 * `PROXIMITY_MAX_MILES` or further.
 */
export function proximityScore(driver: LatLng, pickup: LatLng): number {
  const miles = haversineMiles(driver, pickup)
  return Math.max(0, 1 - miles / PROXIMITY_MAX_MILES)
}

/**
 * The single ranking function used by the server reducer. Weights vary by
 * priority tier; the inputs (blend, location, pickup) are identical across
 * tiers so a driver's relative position can shift purely from the dispatch
 * priority.
 */
export function tierScore(
  blend: DriverBlend,
  driverLocation: LatLng,
  pickup: LatLng,
  priority: DispatchPriority,
): number {
  const w = SCORING_WEIGHTS[priority]
  const prox = proximityScore(driverLocation, pickup)
  return w.accept * blend.accept + w.proximity * prox + w.quality * blend.quality
}

/** Wave size pulled per advance for the given priority's fallback. */
export function fallbackWaveSize(
  priority: DispatchPriority,
  balancedSize: number,
): number {
  if (priority === 'quality') return QUALITY_FALLBACK_WAVE_SIZE
  if (priority === 'balanced') return balancedSize
  return SPEED_WAVE_SIZE
}
