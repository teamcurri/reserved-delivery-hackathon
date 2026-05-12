'use client'

import { useEffect, useMemo, useState } from 'react'
import { Button, Heading, Text, Spinner, Colors } from '@curri/ui'
import {
  type Blast,
  type ClientInfo,
  type DispatchPriority,
  type DriverEntry,
  type OnboardingStep,
  type SessionState,
  SD_CENTER,
  BALANCED_WAVE_SIZE,
  approxMiles,
  driverScore,
  initialBlend,
} from '@hackathon/shared'
import { useSession } from '@/lib/useSession'
import { DispatchMap } from '@/components/DispatchMap'
import {
  DEFAULT_ROUTE,
  DEFAULT_ROUTE_ID,
  ROUTES,
  getRoute,
  type RouteSpec,
} from '@/lib/routes'

const FALLBACK_ENTRY: DriverEntry = {
  blend: initialBlend(),
  location: SD_CENTER,
}

function entryFor(state: SessionState | undefined, clientId: string): DriverEntry {
  return state?.drivers[clientId] ?? FALLBACK_ENTRY
}

export default function DesktopPage() {
  const [sessionId, setSessionId] = useState<string | undefined>()
  const [creating, setCreating] = useState(true)
  const [selectedRouteId, setSelectedRouteId] = useState<string>(DEFAULT_ROUTE_ID)
  const [priority, setPriority] = useState<DispatchPriority>('quality')
  const selectedRoute: RouteSpec = getRoute(selectedRouteId) ?? DEFAULT_ROUTE

  useEffect(() => {
    let cancelled = false
    fetch('/sessions', { method: 'POST' })
      .then((r) => r.json())
      .then((j: { sessionId: string }) => {
        if (cancelled) return
        setSessionId(j.sessionId)
        setCreating(false)
      })
      .catch(() => !cancelled && setCreating(false))
    return () => {
      cancelled = true
    }
  }, [])

  const { status: wsStatus, error, state, clients, dispatch } = useSession(
    sessionId,
    'parent',
    undefined,
    !!sessionId,
  )

  if (creating || !sessionId) {
    return (
      <main style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Spinner />
        <Text size="md">Creating session…</Text>
      </main>
    )
  }

  const qrUrl = `/qr/${sessionId}`
  const mobiles = clients.filter((c) => c.role === 'mobile')

  return (
    <main style={{ maxWidth: 1024, margin: '0 auto', padding: 32 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
        <div>
          <Heading size="h1">Dispatch console</Heading>
          <Text size="sm" color={Colors.GREY_700}>
            ws: {wsStatus}
            {error ? ` — ${error}` : ''}
          </Text>
          <Text size="sm" color={Colors.GREY_700}>
            session <code>{sessionId}</code>
          </Text>
        </div>
        <a href={qrUrl} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
          <Button color="black" variant="outlined">
            Open driver QR
          </Button>
        </a>
      </div>

      <section style={{ marginTop: 16 }}>
        <DispatchMap
          state={state}
          mobiles={state?.delivery ? mobiles : []}
          compose={{
            pickup: selectedRoute.pickup.address,
            dropoff: selectedRoute.dropoff.address,
          }}
        />
      </section>

      <DispatchView
        state={state}
        mobiles={mobiles}
        dispatch={dispatch}
        selectedRoute={selectedRoute}
        selectedRouteId={selectedRouteId}
        setSelectedRouteId={setSelectedRouteId}
        priority={priority}
        setPriority={setPriority}
      />

      <DriverPanel state={state} mobiles={mobiles} />
    </main>
  )
}

function DispatchView({
  state,
  mobiles,
  dispatch,
  selectedRoute,
  selectedRouteId,
  setSelectedRouteId,
  priority,
  setPriority,
}: {
  state: SessionState | undefined
  mobiles: ClientInfo[]
  dispatch: (e: { type: string; payload?: unknown }) => void
  selectedRoute: RouteSpec
  selectedRouteId: string
  setSelectedRouteId: (id: string) => void
  priority: DispatchPriority
  setPriority: (p: DispatchPriority) => void
}) {
  if (!state) {
    return null
  }

  if (state.status === 'idle') {
    return (
      <ComposeForm
        mobiles={mobiles}
        dispatch={dispatch}
        selectedRoute={selectedRoute}
        selectedRouteId={selectedRouteId}
        setSelectedRouteId={setSelectedRouteId}
        priority={priority}
        setPriority={setPriority}
      />
    )
  }

  if (state.status === 'blasting' && state.delivery) {
    return <BlastingView state={state} mobiles={mobiles} dispatch={dispatch} />
  }

  if (state.status === 'fulfilled' && state.delivery) {
    return (
      <section style={{ marginTop: 32 }}>
        <Heading size="h2">Delivery fulfilled</Heading>
        <Text size="md">
          claimed by <strong>{state.fulfilledBy?.identity?.name ?? 'unknown'}</strong>
        </Text>
        <Text size="sm" color={Colors.GREY_700}>
          {state.delivery.pickup} → {state.delivery.dropoff}
        </Text>
        <div style={{ marginTop: 16 }}>
          <Button
            color="teal"
            onClick={() => dispatch({ type: 'delivery:restart' })}
          >
            New delivery
          </Button>
        </div>
      </section>
    )
  }

  return null
}

function ComposeForm({
  mobiles,
  dispatch,
  selectedRoute,
  selectedRouteId,
  setSelectedRouteId,
  priority,
  setPriority,
}: {
  mobiles: ClientInfo[]
  dispatch: (e: { type: string; payload?: unknown }) => void
  selectedRoute: RouteSpec
  selectedRouteId: string
  setSelectedRouteId: (id: string) => void
  priority: DispatchPriority
  setPriority: (p: DispatchPriority) => void
}) {
  const submit = () => {
    if (mobiles.length === 0) return
    dispatch({
      type: 'delivery:dispatch',
      payload: {
        pickup: selectedRoute.pickup.address,
        dropoff: selectedRoute.dropoff.address,
        priority,
      },
    })
  }

  return (
    <section style={{ marginTop: 32 }}>
      <Heading size="h2">New delivery</Heading>

      <Text size="sm" color={Colors.GREY_700}>
        pick a sample route (demo fixtures)
      </Text>

      <RoutePicker selectedRouteId={selectedRouteId} onSelect={setSelectedRouteId} />

      <div
        style={{
          marginTop: 12,
          padding: 12,
          background: Colors.GREY_100,
          borderRadius: 8,
        }}
      >
        <Text size="sm" color={Colors.GREY_700}>
          pickup
        </Text>
        <Text size="md">{selectedRoute.pickup.address}</Text>
        <Text size="sm" color={Colors.GREY_700} style={{ marginTop: 6 }}>
          dropoff
        </Text>
        <Text size="md">{selectedRoute.dropoff.address}</Text>
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
        <PriorityRadio value={priority} onChange={setPriority} />
      </div>

      <Text size="sm" color={Colors.GREY_700}>
        {priority === 'quality'
          ? 'one driver at a time, 30s reserved claim window per driver, fallback to next-best on reject/expire'
          : priority === 'balanced'
            ? `top ${BALANCED_WAVE_SIZE} drivers blasted in parallel, first claim wins; next wave on full wave reject/expire`
            : 'all drivers blasted at once, first claim wins'}
      </Text>

      <div style={{ marginTop: 16 }}>
        <Button color="black" onClick={submit}>
          Dispatch ({mobiles.length} {mobiles.length === 1 ? 'driver' : 'drivers'} online)
        </Button>
      </div>
    </section>
  )
}

function RoutePicker({
  selectedRouteId,
  onSelect,
}: {
  selectedRouteId: string
  onSelect: (id: string) => void
}) {
  return (
    <div
      style={{
        marginTop: 8,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8,
      }}
    >
      {ROUTES.map((r) => {
        const selected = r.id === selectedRouteId
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => onSelect(r.id)}
            style={{
              textAlign: 'left',
              padding: '10px 12px',
              borderRadius: 8,
              border: `2px solid ${selected ? Colors.TEAL_500 : Colors.GREY_300}`,
              background: selected ? Colors.TEAL_050 : '#fff',
              cursor: 'pointer',
              font: 'inherit',
            }}
          >
            <div style={{ fontWeight: 600, fontSize: 14 }}>{r.label}</div>
            <div style={{ fontSize: 12, color: Colors.GREY_700, marginTop: 2 }}>
              {r.pickup.address.split(',')[0]} → {r.dropoff.address.split(',')[0]}
            </div>
          </button>
        )
      })}
    </div>
  )
}

function PriorityRadio({
  value,
  onChange,
}: {
  value: DispatchPriority
  onChange: (p: DispatchPriority) => void
}) {
  const opts: Array<{ key: DispatchPriority; label: string }> = [
    { key: 'quality', label: 'Quality' },
    { key: 'balanced', label: 'Balanced' },
    { key: 'speed', label: 'Speed' },
  ]
  return (
    <fieldset style={{ border: 'none', padding: 0, margin: 0, display: 'flex', gap: 16 }}>
      {opts.map((o) => (
        <label key={o.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <input
            type="radio"
            name="priority"
            value={o.key}
            checked={value === o.key}
            onChange={() => onChange(o.key)}
          />
          <Text size="md">{o.label}</Text>
        </label>
      ))}
    </fieldset>
  )
}

function BlastingView({
  state,
  mobiles,
  dispatch,
}: {
  state: SessionState
  mobiles: ClientInfo[]
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  const delivery = state.delivery!
  const pending = state.blasts.filter((b) => b.outcome === 'pending')
  const history = state.blasts.filter((b) => b.outcome !== 'pending')

  return (
    <section style={{ marginTop: 32 }}>
      <Heading size="h2">Blasting · {delivery.priority}</Heading>
      <Text size="md">
        {delivery.pickup} → {delivery.dropoff}
      </Text>
      <Text size="sm" color={Colors.GREY_700}>
        we usually fulfill deliveries like this within 8 minutes
      </Text>

      {delivery.priority === 'quality' && pending[0] ? (
        <QualityPing blast={pending[0]} mobiles={mobiles} state={state} />
      ) : null}

      {delivery.priority !== 'quality' ? (
        <Text size="md" style={{ marginTop: 12 }}>
          {delivery.priority === 'balanced' ? 'wave: ' : ''}
          blasted {pending.length} {pending.length === 1 ? 'driver' : 'drivers'}
        </Text>
      ) : null}

      {history.length > 0 ? (
        <div style={{ marginTop: 16 }}>
          <Heading size="h4">History</Heading>
          <ul>
            {history.map((b) => (
              <li key={b.blastId}>
                <Text size="sm">
                  {driverName(mobiles, b.driverId)} · {b.outcome}
                </Text>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div style={{ marginTop: 16 }}>
        <Button variant="outlined" onClick={() => dispatch({ type: 'delivery:restart' })}>
          Cancel
        </Button>
      </div>
    </section>
  )
}

function QualityPing({
  blast,
  mobiles,
  state,
}: {
  blast: Blast
  mobiles: ClientInfo[]
  state: SessionState
}) {
  const remaining = useCountdown(blast.expiresAt)
  const driver = mobiles.find((c) => c.clientId === blast.driverId)
  const entry = entryFor(state, blast.driverId)
  const score = driverScore(entry.blend)
  const miles = approxMiles(entry.location)

  return (
    <div
      style={{
        marginTop: 12,
        padding: 16,
        background: Colors.GREY_100,
        borderRadius: 12,
      }}
    >
      <Text size="md">
        found a driver{driver ? <> · <strong>{driver.identity?.name ?? '(no name)'}</strong></> : null} ·{' '}
        {miles} miles from downtown SD
      </Text>
      <Text size="sm" color={Colors.GREY_700}>
        pinging with {score.toFixed(2)} efficiency score
      </Text>
      <Text size="sm" color={Colors.GREY_700}>
        {Math.ceil(remaining / 1000)}s remaining
      </Text>
    </div>
  )
}

function DriverPanel({
  state,
  mobiles,
}: {
  state: SessionState | undefined
  mobiles: ClientInfo[]
}) {
  const activeIds = useMemo(
    () =>
      new Set(
        (state?.blasts ?? []).filter((b) => b.outcome === 'pending').map((b) => b.driverId),
      ),
    [state?.blasts],
  )

  return (
    <section style={{ marginTop: 32 }}>
      <Heading size="h3">Drivers ({mobiles.length})</Heading>
      {mobiles.length === 0 ? (
        <Text size="sm" color={Colors.GREY_700}>
          waiting for drivers to join…
        </Text>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 8 }}>
          <thead>
            <tr style={{ textAlign: 'left' }}>
              <Th>Name</Th>
              <Th>Step</Th>
              <Th>Accept</Th>
              <Th>Quality</Th>
              <Th>Miles</Th>
              <Th>Score</Th>
              <Th>Blast</Th>
            </tr>
          </thead>
          <tbody>
            {mobiles.map((c) => {
              const entry = entryFor(state, c.clientId)
              const score = driverScore(entry.blend)
              const active = activeIds.has(c.clientId)
              const step = entry.onboarding?.step
              return (
                <tr
                  key={c.clientId}
                  style={{
                    background: active ? Colors.YELLOW_100 : 'transparent',
                  }}
                >
                  <Td>{c.identity?.name ?? '(no name)'}</Td>
                  <Td>{step ? prettyStep(step) : '—'}</Td>
                  <Td>{entry.blend.accept.toFixed(2)}</Td>
                  <Td>{entry.blend.quality.toFixed(2)}</Td>
                  <Td>{approxMiles(entry.location)}</Td>
                  <Td>{score.toFixed(2)}</Td>
                  <Td>{active ? '● active' : ''}</Td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
    </section>
  )
}

function prettyStep(step: OnboardingStep): string {
  switch (step) {
    case 'name':
      return 'name'
    case 'quiz:box':
      return 'quiz · box'
    case 'quiz:seatbelt':
      return 'quiz · seatbelt'
    case 'quiz:school-zone':
      return 'quiz · school zone'
    case 'quiz:mom':
      return 'quiz · mom'
    case 'reaction':
      return 'reaction test'
    case 'done':
      return '✓ done'
  }
}

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '6px 8px', fontWeight: 600 }}>{children}</th>
}

function Td({ children }: { children: React.ReactNode }) {
  return <td style={{ padding: '6px 8px', borderTop: `1px solid ${Colors.GREY_200}` }}>{children}</td>
}

function driverName(mobiles: ClientInfo[], clientId: string): string {
  return mobiles.find((c) => c.clientId === clientId)?.identity?.name ?? '(left)'
}

function useCountdown(expiresAt: number): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [])
  return Math.max(0, expiresAt - now)
}
