# Driver-Side Onboarding: Quiz + Reaction Test + Map Placeholder

**Date:** 2026-05-12
**Branch:** `pat/driver-experience`
**Scope:** Mobile driver app only. Desktop ("parent") gains a small read-only
view of driver onboarding state but no new flows.

## Summary

Replace the current manual blend sliders on the driver page with a guided
onboarding sequence after the name field:

1. Name input (existing).
2. **4-question quiz** → `quality` score (1–5★ display, 0..1 internal).
3. **Reaction-time test** → `accept` score (0..1).
4. **Random San Diego location** assigned at completion → `location` lat/lng.
5. Driver lands on a "you're online" view with a score card, an SD map
   placeholder showing their pin, and the existing offer/waiting UI.

Onboarding progress streams to the server as snapshots so the desktop can
render each driver's step + answers live ("interactive onboarding from the
desktop side"). The completed profile is persisted to `localStorage` so a
reload, reconnect, or fresh session can restore without redoing the quiz —
with an explicit "Restore profile / Start over" prompt when prior state is
detected.

## Goals

- Make driver onboarding feel like the spec describes — a goofy but real quiz,
  a reaction test, a personal pin on the SD map.
- Distribute drivers across the map (lat/lng per driver) so the placeholder
  isn't a stack of pins on the SD centroid, and so the future real map
  integration has data to render.
- Survive connection loss and page reloads gracefully (localStorage profile +
  explicit restore prompt).
- Keep the server reducer pure; add exactly one new dispatch type.

## Non-goals

- Real map tiles / routing (external collaborator's slice).
- Scoring formula changes — distance is still display-only in the demo;
  `driverScore = accept * 0.5 + quality * 0.5` stays as-is.
- Auth, persistence beyond `localStorage`, mid-quiz crash recovery.
- Tests beyond ad-hoc node smoke scripts (project has no test harness today
  per `handoff.md`).

## Contract changes

All in `packages/shared/`.

### `DriverBlend` loses `distance`

```ts
// types.ts
export type DriverBlend = { accept: number; quality: number }
```

The `distance` scalar was a self-reported slider input. Now we model location
directly with lat/lng. The reducer's `driverScore` function is **unchanged**
(`accept * 0.5 + quality * 0.5`) — distance was never in the scoring formula,
only in the `approxMiles` display.

### New `LatLng` and driver entry shape

```ts
export type LatLng = { lat: number; lng: number }

// SessionState.drivers value type widens
type DriverEntry = {
  blend: DriverBlend
  location: LatLng
  onboarding?: DriverOnboarding
}
```

`SessionState.drivers` becomes `Record<string, DriverEntry>`. All sites that
read `state.drivers[id]` as a `DriverBlend` (desktop ranking, mobile slider
sync, etc.) switch to `state.drivers[id].blend`.

### New `driver:onboarding` dispatch

```ts
// dispatch.ts
export type DriverDispatch =
  | { type: 'driver:setBlend'; payload: { blend: DriverBlend; location: LatLng } }
  | { type: 'driver:onboarding'; payload: DriverOnboarding }
  | { type: 'delivery:claim'; payload: { blastId: string } }
  | { type: 'delivery:reject'; payload: { blastId: string } }
```

`driver:setBlend` payload widens from `DriverBlend` to `{ blend, location }`
since the two values are produced together at quiz completion (and restored
together from `localStorage`).

```ts
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
  schoolZoneMph?: number   // 0..60
  mom?: boolean
  reactionMs?: number
}

export type DriverOnboarding = {
  step: OnboardingStep
  answers: QuizAnswers
}
```

Each step transition emits a full snapshot (idempotent). The reducer stores
the latest snapshot under `state.drivers[id].onboarding`. The driver is
considered onboarded once `step === 'done'` AND `driver:setBlend` has
populated `blend + location` (which the mobile UI emits in the same tick).

## Scoring (new module: `packages/shared/src/onboarding.ts`)

```ts
export const SCHOOL_ZONE_TARGET_MPH = 25
export const SCHOOL_ZONE_TOLERANCE_MPH = 25

export function scoreQuiz(a: QuizAnswers): number {
  const box      = a.box === 'box' ? 1 : 0
  const seatbelt = a.seatbelt ? 1 : 0
  const mom      = a.mom ? 1 : 0
  const speed    = a.schoolZoneMph == null
    ? 0
    : clamp01(
        1 - Math.abs(a.schoolZoneMph - SCHOOL_ZONE_TARGET_MPH) / SCHOOL_ZONE_TOLERANCE_MPH,
      )
  return (box + seatbelt + mom + speed) / 4   // 0..1 quality
}

export function scoreReaction(ms: number): number {
  // "Percentile feel" curve: most humans land 0.6..0.9.
  if (ms <= 200)  return 1.0
  if (ms <= 250)  return lerp(1.0, 0.9, (ms - 200) / 50)
  if (ms <= 400)  return lerp(0.9, 0.7, (ms - 250) / 150)
  if (ms <= 600)  return lerp(0.7, 0.4, (ms - 400) / 200)
  if (ms <= 1000) return lerp(0.4, 0.1, (ms - 600) / 400)
  return 0.1
}

export function quizStars(quality: number): number {
  return Math.max(1, Math.min(5, Math.round(quality * 4) + 1))
}
```

### Location sampling

```ts
export const SD_CENTER: LatLng = { lat: 32.7157, lng: -117.1611 }
export const SD_RADIUS_MI = 5

export function rollSanDiegoLocation(): LatLng {
  // Uniform sample on a disk around SD center.
  const r = Math.sqrt(Math.random()) * SD_RADIUS_MI
  const t = Math.random() * 2 * Math.PI
  const dLat = (r * Math.cos(t)) / 69
  const dLng = (r * Math.sin(t)) / (69 * Math.cos(SD_CENTER.lat * Math.PI / 180))
  return { lat: SD_CENTER.lat + dLat, lng: SD_CENTER.lng + dLng }
}

export function haversineMiles(a: LatLng, b: LatLng): number { /* standard formula */ }

export function approxMiles(loc: LatLng, origin: LatLng = SD_CENTER): number {
  return Math.round(haversineMiles(loc, origin) * 10) / 10
}
```

`types.ts`'s existing `approxMiles(blend)` is removed in favor of the
location-based version above. Callers (`apps/web/src/app/m/[sessionId]/page.tsx`,
the desktop driver table) switch to passing a `LatLng`.

## UI flow (mobile)

File layout under `apps/web/src/app/m/[sessionId]/`:

```
page.tsx                       (shrinks — name screen + post-onboarding view)
onboarding/
  OnboardingFlow.tsx           orchestrator: step state, emits snapshots
  QuizBoxStep.tsx              box.png vs fox.png picker
  QuizSeatbeltStep.tsx         yes/no with seatbelt emoji
  QuizSchoolZoneStep.tsx       slider 0–60 over school_zone.png
  QuizMomStep.tsx              yes/no with flower emoji
  ReactionStep.tsx             flash-and-tap test
  ScoreCard.tsx                stars + accept + miles, used post-onboarding
  MapPlaceholder.tsx           SVG rect + pin at projected location
  profileStorage.ts            localStorage read/write/clear + version check
  restorePrompt.tsx            banner on the name screen
```

### Step sequence

1. **Name screen** (existing `page.tsx`)
   - If `loadProfile()` returns a profile, render `<RestorePrompt>` banner
     above the name input: "Welcome back, {name}. [Restore profile] [Start
     over]".
   - **Restore** → set local name, connect, `session:join`, then emit
     **two** events in order: `driver:onboarding { step: 'done', answers }`
     (so the desktop sees the restored driver as fully onboarded, not
     uninitialized) followed by `driver:setBlend { blend, location }` with
     the saved values. Transition to the post-onboarding view.
   - **Start over** → `clearProfile()`, proceed with the normal name input.
2. **Submit name** → connect, `session:join`, emit
   `driver:onboarding { step: 'quiz:box', answers: {} }`.
   Driver appears in the desktop driver table in an onboarding state.
3. **`OnboardingFlow`** renders one step at a time:
   - Local state: `{ step, answers }`.
   - On each answer: update local answers, dispatch
     `driver:onboarding { step: nextStep, answers }`, advance.
   - On `step: 'done'`: roll a `LatLng` via `rollSanDiegoLocation()`,
     compute `blend = { accept: scoreReaction(reactionMs), quality: scoreQuiz(answers) }`,
     dispatch `driver:setBlend { blend, location }`, write profile to
     `localStorage`, hand back up to `page.tsx`.
4. **Post-onboarding view** replaces today's `BlendEditor`:
   - `<ScoreCard>` showing stars, accept value, miles from SD center.
   - `<MapPlaceholder>` with the projected pin.
   - Existing `<CurrentStatus>` block (offer view, waiting, fulfilled).
   - No back-edit on the quiz. To re-take, the user uses a small "Reset
     profile" link in the score card → `clearProfile()` + reload.

### Step UI specifics

- **Box vs fox**: two large square image buttons (box.png, fox.png).
  Tap commits the answer; no separate confirm button. Correct = "box".
- **Seatbelt**: large 🪢 emoji, "Do you wear a seatbelt?", two buttons
  [Yes] [No]. Yes = correct (1pt).
- **School zone**: school_zone.png above a 0–60 mph slider with a big
  current-value readout. [Confirm] commits. Score is closeness to 25mph,
  linear falloff over ±25mph.
- **Called mom**: 🌸 emoji, "Did you call your mom on Sunday?",
  [Yes] [No]. Yes = correct (1pt).
- **Reaction test**:
  - Full-bleed tap target, dark background, text "Wait for it…".
  - Random `setTimeout` between 2000–4000ms flips background to white and
    arms the tap handler.
  - On tap, record `performance.now() - flashAt`, advance.
  - **False start** (tap before flash): show "Too eager — try again",
    reset the wait timer once. A second false start commits 1500ms (≈0.2
    accept) and moves on.
  - **No-tap timeout**: 3s after flash with no tap commits 1500ms.

### Map placeholder

```
┌────────────────────────────────────┐
│ San Diego (placeholder)            │
│                                    │
│           ●  ← you                 │   (pin projected from lat/lng)
│                                    │
│                                    │
└────────────────────────────────────┘
```

Projection:
```ts
const LNG_SPAN = (SD_RADIUS_MI * 2) / (69 * Math.cos(SD_CENTER.lat * Math.PI/180))
const LAT_SPAN = (SD_RADIUS_MI * 2) / 69

const x = ((loc.lng - SD_CENTER.lng) / LNG_SPAN + 0.5) * width
const y = ((SD_CENTER.lat - loc.lat) / LAT_SPAN + 0.5) * height
```

Pin clamped to a small inset so it doesn't fall on the edge if the random
draw is near the boundary. When the external map collaborator replaces the
placeholder rectangle with a real tile layer, the lat/lng on the driver
entry stays untouched.

## Persistence

### Storage key + schema

```ts
const KEY = 'hackathon:driverProfile'

type SavedProfile = {
  version: 1
  name: string
  blend: DriverBlend
  location: LatLng
  quizAnswers: Required<QuizAnswers>
  reactionMs: number
}
```

Device-wide, one profile total. Not keyed by session — driver redoes nothing
when joining a different session URL.

### API (`profileStorage.ts`)

```ts
loadProfile(): SavedProfile | null   // null on miss / parse error / version mismatch
saveProfile(p: SavedProfile): void   // best-effort, swallows write errors
clearProfile(): void
```

`loadProfile` returns `null` for:
- key not present,
- `JSON.parse` failure,
- `version !== 1`,
- missing required fields,
- empty/whitespace `name`.

On version mismatch, also surface a one-time toast: "Saved profile was from
an older build — please redo onboarding." (Toast = a small `Text` line at
the top of the name screen; no curri-ui toast component is required.)

### Restore flow

The restore prompt is the only entry point that uses saved data. Once
restored, the next session-state push from the server is the source of
truth; localStorage is touched again only on a fresh quiz completion.

## Server changes

`apps/server/src/reducer.ts`:

- `driver:onboarding`: store `payload` under `state.drivers[clientId].onboarding`.
  Create the entry with default blend (`{ accept: 0.5, quality: 0.5 }`) and a
  fallback location (`SD_CENTER`) if it didn't exist yet. (Distinct from
  today's flow where `driver:setBlend` was the only way to create an entry.)
- `driver:setBlend`: payload is now `{ blend, location }`. **Upsert** — create
  the driver entry if missing (this is the restore-profile path, which skips
  onboarding events entirely), otherwise replace `blend` + `location` and
  preserve any existing `onboarding`.
- All existing references to `state.drivers[id]` as a `DriverBlend` (e.g.,
  the quality-path ranking that uses `driverScore`) switch to
  `state.drivers[id].blend`.

`apps/server/src/sessions.ts` is unaffected — the `BlastTimer` doesn't touch
driver-entry shape.

When a client disconnects, the existing cleanup path (whatever currently
removes `state.drivers[id]`) stays the same. Reconnecting via restore-profile
re-creates the entry as if it were a fresh join with prefilled values.

## Data flow (happy path)

```
mobile (driver)                   server                       desktop (parent)
──────────────                    ──────                       ─────────────────
name submit
  → session:join                  insert client
                                  push session:state ──────▶   driver appears, no
                                                               onboarding yet

quiz:box step
  → driver:onboarding             store onboarding,
    { step: 'quiz:box', ... }     create drivers[id] with
                                  default blend+location
                                  push session:state ──────▶   driver row shows
                                                               "step: quiz:box"

… subsequent steps emit driver:onboarding snapshots, desktop sees live progress …

reaction complete
  → driver:setBlend               replace blend + location,
    { blend, location }           keep onboarding (now done)
                                  push session:state ──────▶   driver row shows
                                                               final score, on map
saveProfile(...)
post-onboarding UI renders
```

## Error handling

- **Reaction false start (1st)**: warn, re-arm timer. (2nd) commit 1500ms.
- **Reaction no-tap within 3s of flash**: commit 1500ms.
- **localStorage unavailable / quota / parse error**: treat as no profile,
  swallow. No banner.
- **Version mismatch**: clear key, show toast on name screen.
- **Reload mid-quiz**: in-flight quiz answers are *not* persisted. Driver
  restarts at the name screen. Already-stored profile (from a prior session)
  is still restorable.
- **Connection loss after onboarding completes**: existing `useSession`
  reconnect remains; profile in localStorage means even a hard reload
  re-joins without re-quizzing (restore prompt fires).
- **Empty/whitespace saved name**: treated as no profile.
- **`driver:onboarding` arrives without a prior `session:join`**: reducer
  ignores (no entry to attach to). This shouldn't happen because the join
  precedes the first onboarding snapshot, but the reducer must be defensive.

## Testing

The repo has no test harness today (per `handoff.md`). This change does not
introduce one. Verification plan:

- **Pure helpers in `onboarding.ts`** (`scoreQuiz`, `scoreReaction`,
  `quizStars`, `rollSanDiegoLocation`, `haversineMiles`, `approxMiles`):
  boundary values eyeballed in a throwaway node smoke script in the style
  of the existing WS smoke (`node --input-type=module -e '...'`).
- **Reducer**: extend the existing smoke script to send a sequence of
  `driver:onboarding` snapshots followed by a final `driver:setBlend`, and
  assert the resulting `SessionState.drivers[id]` shape.
- **UI**: manual browser pass for golden path + each error case (false
  starts, no-tap timeout, restore prompt accept/reject, version mismatch
  toast, localStorage disabled). Documented in the PR description.

## Open follow-ups (deliberately out of scope)

- Real map tile rendering (external collaborator).
- Distance factored into `driverScore` (handoff already flags this as the
  clean replacement point; lat/lng makes it feasible but the demo is fine
  without it).
- Desktop driver table redesign to visualize onboarding step / quiz
  answers richly. For this spec the desktop just needs to not crash on the
  new entry shape — a richer view can come later.
- Re-take quiz UI affordance beyond the "Reset profile" link.
