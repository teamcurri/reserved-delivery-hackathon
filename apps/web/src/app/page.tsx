'use client'

import { useEffect, useMemo, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Button, Heading, Text, InputText, Spinner, Colors } from '@curri/ui'
import {
  type Blast,
  type ClientInfo,
  type DispatchPriority,
  type SessionState,
  approxMiles,
  driverScore,
  initialBlend,
} from '@hackathon/shared'
import { useSession } from '@/lib/useSession'
import { WEB_URL } from '@/lib/env'

export default function DesktopPage() {
  const [sessionId, setSessionId] = useState<string | undefined>()
  const [creating, setCreating] = useState(true)

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

  const mobileUrl = `${WEB_URL}/m/${sessionId}`
  const mobiles = clients.filter((c) => c.role === 'mobile')

  return (
    <main style={{ maxWidth: 1024, margin: '0 auto', padding: 32 }}>
      <Heading size="h1">Dispatch console</Heading>
      <Text size="sm" color={Colors.GREY_700}>
        ws: {wsStatus}
        {error ? ` — ${error}` : ''}
      </Text>

      <section
        style={{
          marginTop: 16,
          padding: 16,
          background: Colors.GREY_100,
          borderRadius: 12,
          display: 'flex',
          gap: 24,
          alignItems: 'center',
        }}
      >
        <QRCodeCanvas value={mobileUrl} size={144} marginSize={2} />
        <div>
          <Text size="sm" color={Colors.GREY_700}>
            drivers join here
          </Text>
          <Text size="md">
            <a href={mobileUrl}>{mobileUrl}</a>
          </Text>
          <Text size="sm" color={Colors.GREY_700}>
            session <code>{sessionId}</code>
          </Text>
        </div>
      </section>

      <DispatchView state={state} mobiles={mobiles} dispatch={dispatch} />

      <DriverPanel state={state} mobiles={mobiles} />
    </main>
  )
}

function DispatchView({
  state,
  mobiles,
  dispatch,
}: {
  state: SessionState | undefined
  mobiles: ClientInfo[]
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  if (!state) {
    return null
  }

  if (state.status === 'idle') {
    return <ComposeForm mobiles={mobiles} dispatch={dispatch} />
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
}: {
  mobiles: ClientInfo[]
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  const [pickup, setPickup] = useState('123 Main St')
  const [dropoff, setDropoff] = useState('456 Oak Ave')
  const [priority, setPriority] = useState<DispatchPriority>('quality')

  const submit = () => {
    if (!pickup.trim() || !dropoff.trim()) return
    if (mobiles.length === 0) return
    dispatch({
      type: 'delivery:dispatch',
      payload: { pickup: pickup.trim(), dropoff: dropoff.trim(), priority },
    })
  }

  return (
    <section style={{ marginTop: 32 }}>
      <Heading size="h2">New delivery</Heading>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
        <InputText
          label="Pickup"
          value={pickup}
          onChange={(e) => setPickup((e.target as HTMLInputElement).value)}
        />
        <InputText
          label="Dropoff"
          value={dropoff}
          onChange={(e) => setDropoff((e.target as HTMLInputElement).value)}
        />
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 16 }}>
        <PriorityRadio value={priority} onChange={setPriority} />
      </div>

      <Text size="sm" color={Colors.GREY_700}>
        {priority === 'quality'
          ? 'one driver at a time, 30s reserved claim window per driver, fallback to next-best on reject/expire'
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

function PriorityRadio({
  value,
  onChange,
}: {
  value: DispatchPriority
  onChange: (p: DispatchPriority) => void
}) {
  const opts: Array<{ key: DispatchPriority; label: string }> = [
    { key: 'quality', label: 'Quality' },
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

      {delivery.priority === 'speed' ? (
        <Text size="md" style={{ marginTop: 12 }}>
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
  const blend = state.drivers[blast.driverId] ?? initialBlend()
  const score = driverScore(blend)
  const miles = approxMiles(blend)

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
        {miles} miles away
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
              <Th>Distance</Th>
              <Th>Accept</Th>
              <Th>Quality</Th>
              <Th>Score</Th>
              <Th>Blast</Th>
            </tr>
          </thead>
          <tbody>
            {mobiles.map((c) => {
              const blend = state?.drivers[c.clientId] ?? initialBlend()
              const score = driverScore(blend)
              const active = activeIds.has(c.clientId)
              return (
                <tr
                  key={c.clientId}
                  style={{
                    background: active ? Colors.YELLOW_100 : 'transparent',
                  }}
                >
                  <Td>{c.identity?.name ?? '(no name)'}</Td>
                  <Td>{blend.distance.toFixed(2)}</Td>
                  <Td>{blend.accept.toFixed(2)}</Td>
                  <Td>{blend.quality.toFixed(2)}</Td>
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
