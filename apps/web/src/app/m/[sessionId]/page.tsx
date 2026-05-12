'use client'

import { useEffect, useRef, useState, use } from 'react'
import { Button, Heading, Text, InputText, Spinner, Colors } from '@curri/ui'
import {
  type Blast,
  type DriverBlend,
  type SessionState,
  approxMiles,
  driverScore,
  initialBlend,
} from '@hackathon/shared'
import { useSession } from '@/lib/useSession'

type PageProps = { params: Promise<{ sessionId: string }> }

export default function MobilePage({ params }: PageProps) {
  const { sessionId } = use(params)
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const trimmedName = name.trim()
  const identity = submitted && trimmedName ? { name: trimmedName } : undefined
  const { status, error, state, clientId, dispatch } = useSession(
    sessionId,
    'mobile',
    identity,
    submitted && !!trimmedName,
  )

  const join = () => {
    if (trimmedName) setSubmitted(true)
  }

  if (!submitted) {
    return (
      <main style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        <Heading size="h2">Join session</Heading>
        <Text size="sm" color={Colors.GREY_700}>
          <code>{sessionId}</code>
        </Text>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            join()
          }}
          style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}
        >
          <InputText
            label="Your name"
            value={name}
            onChange={(e) => setName((e.target as HTMLInputElement).value)}
            placeholder="e.g. Patrick"
            autoFocus
          />
          <Button type="submit" onClick={join} isFullWidth>
            Join
          </Button>
        </form>
        <Text size="sm" color={Colors.GREY_700}>
          {trimmedName ? `will join as "${trimmedName}"` : 'type a name first'}
        </Text>
      </main>
    )
  }

  if (status === 'connecting' || status === 'idle') {
    return (
      <main style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Spinner />
        <Text size="md">Connecting…</Text>
      </main>
    )
  }

  if (status === 'error') {
    return (
      <main style={{ padding: 24 }}>
        <Heading size="h3">Couldn’t join</Heading>
        <Text size="md" color={Colors.RED_500}>
          {error}
        </Text>
      </main>
    )
  }

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
      <Heading size="h2">Driver: {trimmedName}</Heading>

      <BlendEditor
        blend={state?.drivers[clientId ?? ''] ?? initialBlend()}
        onChange={(blend) => dispatch({ type: 'driver:setBlend', payload: blend })}
      />

      <CurrentStatus state={state} myClientId={clientId} dispatch={dispatch} myName={trimmedName} />
    </main>
  )
}

function BlendEditor({
  blend,
  onChange,
}: {
  blend: DriverBlend
  onChange: (b: DriverBlend) => void
}) {
  // Local mirror so the slider tracks input smoothly while we debounce server emits.
  const [local, setLocal] = useState(blend)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    // Sync down from server-pushed state (e.g. another tab from same driver).
    setLocal(blend)
  }, [blend.distance, blend.accept, blend.quality])

  const emit = (next: DriverBlend) => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => onChange(next), 150)
  }

  const set = (key: keyof DriverBlend) => (v: number) => {
    const next = { ...local, [key]: v }
    setLocal(next)
    emit(next)
  }

  return (
    <section style={{ marginTop: 24 }}>
      <Heading size="h4">Your blend</Heading>
      <Slider label="Distance (1 = nearby)" value={local.distance} onChange={set('distance')} />
      <Slider label="Accept probability" value={local.accept} onChange={set('accept')} />
      <Slider label="Quality" value={local.quality} onChange={set('quality')} />
      <Text size="sm" color={Colors.GREY_700}>
        score {driverScore(local).toFixed(2)} · approx {approxMiles(local)} mi away
      </Text>
    </section>
  )
}

function Slider({
  label,
  value,
  onChange,
}: {
  label: string
  value: number
  onChange: (v: number) => void
}) {
  return (
    <label style={{ display: 'block', marginTop: 12 }}>
      <Text size="sm">
        {label} — {value.toFixed(2)}
      </Text>
      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={Math.round(value * 100)}
        onChange={(e) => onChange(Number(e.target.value) / 100)}
        style={{ width: '100%' }}
      />
    </label>
  )
}

function CurrentStatus({
  state,
  myClientId,
  myName,
  dispatch,
}: {
  state: SessionState | undefined
  myClientId: string | undefined
  myName: string
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  if (!state || !myClientId) return null

  const myBlasts = state.blasts.filter((b) => b.driverId === myClientId)
  const myPending = myBlasts.find((b) => b.outcome === 'pending')
  const myLast = myBlasts[myBlasts.length - 1]

  if (myPending) {
    return <OfferView blast={myPending} state={state} dispatch={dispatch} />
  }

  if (state.status === 'fulfilled') {
    const wasMe = state.fulfilledBy?.clientId === myClientId
    return (
      <section style={{ marginTop: 24 }}>
        <Heading size="h3">{wasMe ? 'You claimed it' : 'Another driver claimed it'}</Heading>
        {state.delivery ? (
          <Text size="md">
            {state.delivery.pickup} → {state.delivery.dropoff}
          </Text>
        ) : null}
      </section>
    )
  }

  if (state.status === 'blasting') {
    // Delivery in flight but not our offer (quality path, another driver is up).
    return (
      <section style={{ marginTop: 24 }}>
        <Heading size="h3">Standing by</Heading>
        <Text size="sm" color={Colors.GREY_700}>
          another driver has the reserved offer
        </Text>
      </section>
    )
  }

  // idle: surface our last outcome if we had one
  if (myLast?.outcome === 'rejected') {
    return (
      <section style={{ marginTop: 24 }}>
        <Heading size="h3">You passed on the last offer</Heading>
        <Text size="sm" color={Colors.GREY_700}>
          waiting for the next one
        </Text>
      </section>
    )
  }

  if (myLast?.outcome === 'expired') {
    return (
      <section style={{ marginTop: 24 }}>
        <Heading size="h3">Offer expired</Heading>
        <Text size="sm" color={Colors.GREY_700}>
          waiting for the next one
        </Text>
      </section>
    )
  }

  return (
    <section style={{ marginTop: 24 }}>
      <Heading size="h3">Waiting for deliveries…</Heading>
      <Text size="sm" color={Colors.GREY_700}>
        hi {myName}, you’re online
      </Text>
    </section>
  )
}

function OfferView({
  blast,
  state,
  dispatch,
}: {
  blast: Blast
  state: SessionState
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  const remaining = useCountdown(blast.expiresAt)
  const secs = Math.ceil(remaining / 1000)
  const delivery = state.delivery

  return (
    <section
      style={{
        marginTop: 24,
        padding: 16,
        background: blast.reserved ? Colors.YELLOW_100 : Colors.GREY_100,
        borderRadius: 12,
      }}
    >
      <Heading size="h3">
        {blast.reserved ? 'Reserved offer' : 'Blast received'}
      </Heading>
      <Text size="sm" color={Colors.GREY_700}>
        {blast.reserved
          ? '30s reserved claim window — first refusal is yours'
          : 'open blast — first claim wins'}
      </Text>

      {delivery ? (
        <div style={{ marginTop: 8 }}>
          <Text size="md">
            <strong>{delivery.pickup}</strong> → <strong>{delivery.dropoff}</strong>
          </Text>
        </div>
      ) : null}

      <Text size="sm" color={Colors.GREY_700}>
        {secs}s remaining
      </Text>

      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Button
          color="teal"
          isFullWidth
          onClick={() => dispatch({ type: 'delivery:claim', payload: { blastId: blast.blastId } })}
        >
          {blast.reserved ? 'Accept' : 'Claim'}
        </Button>
        {blast.reserved ? (
          <Button
            color="red"
            variant="outlined"
            isFullWidth
            onClick={() =>
              dispatch({ type: 'delivery:reject', payload: { blastId: blast.blastId } })
            }
          >
            Pass
          </Button>
        ) : null}
      </div>
    </section>
  )
}

function useCountdown(expiresAt: number): number {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(t)
  }, [])
  return Math.max(0, expiresAt - now)
}
