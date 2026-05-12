'use client'

import { useEffect, useRef, useState, use } from 'react'
import { Button, Heading, Text, InputText, Spinner, Colors } from '@curri/ui'
import {
  type Blast,
  type DispatchEvent,
  type DriverBlend,
  type LatLng,
  type QuizAnswers,
  type SessionState,
} from '@hackathon/shared'
import { useSession } from '@/lib/useSession'
import { DispatchMap } from '@/components/DispatchMap'
import {
  DispatchView,
  Header,
  HEADER_HEIGHT,
  MAP_HEIGHT,
  StatusStrip,
} from './dispatch/DispatchView'
import { OutcomeCard } from './dispatch/OutcomeCard'
import { OnboardingFlow, type OnboardingResult } from './onboarding/OnboardingFlow'
import { ScoreCard } from './onboarding/ScoreCard'
import { RestorePrompt } from './onboarding/RestorePrompt'
import {
  type SavedProfile,
  clearProfile,
  hasStaleProfile,
  loadProfile,
  saveProfile,
} from './onboarding/profileStorage'

type PageProps = { params: Promise<{ sessionId: string }> }

type Phase = 'name' | 'onboarding' | 'online'

type ActiveProfile = {
  blend: DriverBlend
  location: LatLng
  quizAnswers: Required<QuizAnswers>
  reactionMs: number
}

export default function MobilePage({ params }: PageProps) {
  const { sessionId } = use(params)

  const [name, setName] = useState('')
  const [phase, setPhase] = useState<Phase>('name')
  const [savedProfile, setSavedProfile] = useState<SavedProfile | null | undefined>(undefined)
  const [staleWarn, setStaleWarn] = useState(false)
  const [active, setActive] = useState<ActiveProfile | null>(null)
  const restorePending = useRef(false)
  const firstOnboardingSent = useRef(false)

  useEffect(() => {
    setSavedProfile(loadProfile())
    setStaleWarn(hasStaleProfile())
  }, [])

  const trimmedName = name.trim()
  const identity = phase !== 'name' && trimmedName ? { name: trimmedName } : undefined
  const enabled = phase !== 'name' && !!trimmedName
  const { status, error, state, clients, clientId, dispatch } = useSession(
    sessionId,
    'mobile',
    identity,
    enabled,
  )

  // Once the join completes (clientId set), do per-phase first emits.
  useEffect(() => {
    if (!clientId) return

    if (restorePending.current && active) {
      // Restore path: tell server the driver is fully onboarded with saved values.
      dispatch({
        type: 'driver:onboarding',
        payload: { step: 'done', answers: active.quizAnswers },
      })
      dispatch({
        type: 'driver:setBlend',
        payload: { blend: active.blend, location: active.location },
      })
      restorePending.current = false
      return
    }

    if (phase === 'onboarding' && !firstOnboardingSent.current) {
      dispatch({
        type: 'driver:onboarding',
        payload: { step: 'quiz:box', answers: {} },
      })
      firstOnboardingSent.current = true
    }
  }, [clientId, phase, active, dispatch])

  const handleRestore = () => {
    if (!savedProfile) return
    setName(savedProfile.name)
    setActive({
      blend: savedProfile.blend,
      location: savedProfile.location,
      quizAnswers: savedProfile.quizAnswers,
      reactionMs: savedProfile.reactionMs,
    })
    restorePending.current = true
    setPhase('online')
  }

  const handleStartOver = () => {
    clearProfile()
    setSavedProfile(null)
    setStaleWarn(false)
  }

  const handleNameSubmit = () => {
    if (!trimmedName) return
    setPhase('onboarding')
  }

  const handleOnboardingComplete = (result: OnboardingResult) => {
    setActive(result)
    saveProfile({
      version: 1,
      name: trimmedName,
      blend: result.blend,
      location: result.location,
      reactionMs: result.reactionMs,
      quizAnswers: result.quizAnswers,
    })
    dispatch({
      type: 'driver:setBlend',
      payload: { blend: result.blend, location: result.location },
    })
    setPhase('online')
  }

  const handleResetProfile = () => {
    clearProfile()
    if (typeof window !== 'undefined') window.location.reload()
  }

  if (phase === 'name') {
    return (
      <main style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        <Heading size="h2">Join session</Heading>
        <Text size="sm" color={Colors.GREY_700}>
          <code>{sessionId}</code>
        </Text>

        {staleWarn ? (
          <Text size="sm" color={Colors.RED_500}>
            saved profile is from an older build — please redo onboarding
          </Text>
        ) : null}

        {savedProfile ? (
          <div style={{ marginTop: 16 }}>
            <RestorePrompt
              profile={savedProfile}
              onRestore={handleRestore}
              onStartOver={handleStartOver}
            />
          </div>
        ) : null}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleNameSubmit()
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
          <Button type="submit" onClick={handleNameSubmit} isFullWidth>
            Next
          </Button>
        </form>
        <Text size="sm" color={Colors.GREY_700}>
          {trimmedName ? `will join as "${trimmedName}"` : 'type a name first'}
        </Text>
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

  if (status === 'connecting' || status === 'idle' || !clientId) {
    return (
      <main style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 12 }}>
        <Spinner />
        <Text size="md">Connecting…</Text>
      </main>
    )
  }

  if (phase === 'onboarding') {
    return (
      <main style={{ maxWidth: 480, margin: '0 auto', padding: 24 }}>
        <Heading size="h2">Hi, {trimmedName}</Heading>
        <Text size="sm" color={Colors.GREY_700}>
          quick onboarding before you go online
        </Text>
        <OnboardingFlow dispatch={dispatch} onComplete={handleOnboardingComplete} />
      </main>
    )
  }

  // phase === 'online'
  const me = clients.find((c) => c.clientId === clientId)
  const myPending = state?.blasts.find(
    (b) => b.driverId === clientId && b.outcome === 'pending',
  )

  // Pending offer → solo full-screen dispatch view, nothing else.
  if (myPending && state && clientId) {
    return (
      <DispatchView
        blast={myPending}
        state={state}
        me={me}
        clientId={clientId}
        dispatch={dispatch}
      />
    )
  }

  const fulfilled = state?.status === 'fulfilled'
  const wasMe = state?.fulfilledBy?.clientId === clientId
  const standingBy = state?.status === 'blasting' && !myPending
  const stripText = fulfilled
    ? 'DELIVERY IN PROGRESS'
    : standingBy
      ? 'STANDING BY'
      : 'WAITING FOR DELIVERIES'
  const stripColor = fulfilled
    ? wasMe
      ? '#c8e8c4' // soft green
      : Colors.GREY_200
    : standingBy
      ? '#fce7d8' // soft amber
      : '#d6eafa' // calm blue

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#fcfcfc',
        paddingBottom: 24,
      }}
    >
      <Header label={`Driver · ${trimmedName}`} />
      <div style={{ height: HEADER_HEIGHT }} />

      {me ? (
        <div style={{ padding: '8px 16px 0' }}>
          <DispatchMap state={state} mobiles={[me]} selfId={clientId} height={MAP_HEIGHT} />
        </div>
      ) : null}

      <StatusStrip text={stripText} background={stripColor} />

      <section style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        {fulfilled ? (
          <OutcomeCard wasMe={wasMe} delivery={state?.delivery} />
        ) : active ? (
          <ScoreCard
            blend={active.blend}
            location={active.location}
            onReset={handleResetProfile}
          />
        ) : null}

        {!fulfilled ? (
          <CurrentStatus
            state={state}
            myClientId={clientId}
            dispatch={dispatch}
            myName={trimmedName}
          />
        ) : null}
      </section>
    </main>
  )
}

/**
 * Subtle hints below the score card on the waiting/online page. The header
 * + status strip cover the high-level state (WAITING / STANDING BY /
 * DELIVERY COMPLETE); this just surfaces "you passed" or "expired" detail
 * after a previous offer resolved.
 */
function CurrentStatus({
  state,
  myClientId,
}: {
  state: SessionState | undefined
  myClientId: string | undefined
  myName: string
  dispatch: (e: DispatchEvent) => void
}) {
  if (!state || !myClientId) return null
  if (state.status !== 'idle') return null

  const myBlasts = state.blasts.filter((b) => b.driverId === myClientId)
  const myLast = myBlasts[myBlasts.length - 1]

  if (myLast?.outcome === 'rejected') {
    return (
      <Text size="sm" color={Colors.GREY_700}>
        you passed on the last offer — waiting for the next one
      </Text>
    )
  }

  if (myLast?.outcome === 'expired') {
    return (
      <Text size="sm" color={Colors.GREY_700}>
        last offer expired — waiting for the next one
      </Text>
    )
  }

  return null
}

function OfferView({
  blast,
  state,
  dispatch,
}: {
  blast: Blast
  state: SessionState
  dispatch: (e: DispatchEvent) => void
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
