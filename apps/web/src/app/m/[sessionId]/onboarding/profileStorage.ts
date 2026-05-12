'use client'

import type {
  DriverBlend,
  LatLng,
  QuizAnswers,
} from '@hackathon/shared'

const KEY = 'hackathon:driverProfile'

export type SavedProfile = {
  version: 1
  name: string
  blend: DriverBlend
  location: LatLng
  reactionMs: number
  quizAnswers: Required<QuizAnswers>
}

/** Returns null if no profile, parse fails, version mismatches, or fields are invalid. */
export function loadProfile(): SavedProfile | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<SavedProfile>
    if (parsed.version !== 1) return null
    if (!parsed.name || !parsed.name.trim()) return null
    if (!parsed.blend || typeof parsed.blend.accept !== 'number' || typeof parsed.blend.quality !== 'number') return null
    if (!parsed.location || typeof parsed.location.lat !== 'number' || typeof parsed.location.lng !== 'number') return null
    if (typeof parsed.reactionMs !== 'number') return null
    if (!parsed.quizAnswers) return null
    return parsed as SavedProfile
  } catch {
    return null
  }
}

export function saveProfile(p: SavedProfile): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(KEY, JSON.stringify(p))
  } catch {
    // localStorage disabled / quota — non-fatal, just won't restore later.
  }
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(KEY)
  } catch {
    // ignore
  }
}

/**
 * Distinguishes "no key" from "key present but invalid". A present-but-invalid
 * profile means the user previously onboarded on an older schema; surface a
 * gentle toast on the name screen.
 */
export function hasStaleProfile(): boolean {
  if (typeof window === 'undefined') return false
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return false
    const parsed = JSON.parse(raw)
    return parsed?.version !== 1
  } catch {
    return false
  }
}
