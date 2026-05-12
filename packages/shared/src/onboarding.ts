import type { LatLng, QuizAnswers } from './types'

export const SCHOOL_ZONE_TARGET_MPH = 25
export const SCHOOL_ZONE_TOLERANCE_MPH = 25

export const SD_CENTER: LatLng = { lat: 32.7157, lng: -117.1611 }
export const SD_RADIUS_MI = 5

const clamp01 = (n: number) => Math.max(0, Math.min(1, n))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t

/**
 * Map the four quiz answers to a 0..1 quality value.
 * Items are weighted equally; the school-zone slider is a linear falloff
 * around the target speed, all other items are binary.
 */
export function scoreQuiz(a: QuizAnswers): number {
  const box = a.box === 'box' ? 1 : 0
  const seatbelt = a.seatbelt ? 1 : 0
  const mom = a.mom ? 1 : 0
  const speed =
    a.schoolZoneMph == null
      ? 0
      : clamp01(
          1 -
            Math.abs(a.schoolZoneMph - SCHOOL_ZONE_TARGET_MPH) /
              SCHOOL_ZONE_TOLERANCE_MPH,
        )
  return (box + seatbelt + mom + speed) / 4
}

/**
 * Map reaction-time ms to a 0..1 accept value. Curve is shaped so a typical
 * human (250–600ms) lands in the 0.4–0.9 band — most drivers feel rewarded.
 */
export function scoreReaction(ms: number): number {
  if (ms <= 200) return 1.0
  if (ms <= 250) return lerp(1.0, 0.9, (ms - 200) / 50)
  if (ms <= 400) return lerp(0.9, 0.7, (ms - 250) / 150)
  if (ms <= 600) return lerp(0.7, 0.4, (ms - 400) / 200)
  if (ms <= 1000) return lerp(0.4, 0.1, (ms - 600) / 400)
  return 0.1
}

/** Worst answers still get 1 star, perfect run gets 5. */
export function quizStars(quality: number): number {
  return Math.max(1, Math.min(5, Math.round(quality * 4) + 1))
}

/** Uniform sample on a disk of radius SD_RADIUS_MI around SD_CENTER. */
export function rollSanDiegoLocation(): LatLng {
  const r = Math.sqrt(Math.random()) * SD_RADIUS_MI
  const t = Math.random() * 2 * Math.PI
  const dLat = (r * Math.cos(t)) / 69
  const dLng =
    (r * Math.sin(t)) / (69 * Math.cos((SD_CENTER.lat * Math.PI) / 180))
  return { lat: SD_CENTER.lat + dLat, lng: SD_CENTER.lng + dLng }
}

const EARTH_RADIUS_MI = 3958.8

export function haversineMiles(a: LatLng, b: LatLng): number {
  const toRad = (d: number) => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_MI * Math.asin(Math.sqrt(h))
}

/** Display helper — defaults origin to the SD centroid. */
export function approxMiles(loc: LatLng, origin: LatLng = SD_CENTER): number {
  return Math.round(haversineMiles(loc, origin) * 10) / 10
}

/**
 * Project a lat/lng into a width×height pixel box, assuming a window of
 * ±SD_RADIUS_MI around SD_CENTER. Linear (not Mercator) — fine for ±5mi.
 */
export function projectToBox(
  loc: LatLng,
  width: number,
  height: number,
  inset = 12,
): { x: number; y: number } {
  const latSpan = (SD_RADIUS_MI * 2) / 69
  const lngSpan =
    (SD_RADIUS_MI * 2) / (69 * Math.cos((SD_CENTER.lat * Math.PI) / 180))
  const fx = (loc.lng - SD_CENTER.lng) / lngSpan + 0.5
  const fy = (SD_CENTER.lat - loc.lat) / latSpan + 0.5
  const x = Math.max(inset, Math.min(width - inset, fx * width))
  const y = Math.max(inset, Math.min(height - inset, fy * height))
  return { x, y }
}
