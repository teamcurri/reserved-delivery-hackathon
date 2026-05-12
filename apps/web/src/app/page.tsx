'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  Button,
  Heading,
  Text,
  Spinner,
  Colors,
  InputSelect,
  InputText,
} from '@curri/ui'
import {
  type Blast,
  type ClientInfo,
  type DispatchPriority,
  type DriverEntry,
  type SessionState,
  SD_CENTER,
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
  const [priority, setPriority] = useState<DispatchPriority>('speed')
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

      <section
        style={{
          marginTop: 16,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
          gap: 24,
          alignItems: 'start',
        }}
      >
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

        <DispatchMap
          state={state}
          mobiles={mobiles}
          compose={{
            pickup: selectedRoute.pickup.address,
            dropoff: selectedRoute.dropoff.address,
          }}
        />
      </section>
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
      <section>
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

type WizardStep = 'stops' | 'options'

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
  const [step, setStep] = useState<WizardStep>('stops')

  const book = () => {
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
    <section>
      <StepBreadcrumb step={step} onSelect={setStep} />
      {step === 'stops' ? (
        <>
          <Heading size="h2">Stops</Heading>
          <StopsStep
            selectedRoute={selectedRoute}
            selectedRouteId={selectedRouteId}
            setSelectedRouteId={setSelectedRouteId}
            onNext={() => setStep('options')}
          />
        </>
      ) : (
        <OptionsStep
          priority={priority}
          setPriority={setPriority}
          mobiles={mobiles}
          onBack={() => setStep('stops')}
          onBook={book}
        />
      )}
    </section>
  )
}

function StepBreadcrumb({
  step,
  onSelect,
}: {
  step: WizardStep
  onSelect: (s: WizardStep) => void
}) {
  const steps: Array<{ key: WizardStep; label: string }> = [
    { key: 'stops', label: 'Stops' },
    { key: 'options', label: 'Dispatch options' },
  ]
  return (
    <nav
      aria-label="wizard"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 12,
        fontSize: 13,
      }}
    >
      {steps.map((s, i) => {
        const active = s.key === step
        return (
          <span key={s.key} style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {i > 0 ? (
              <span aria-hidden style={{ color: Colors.GREY_400 }}>›</span>
            ) : null}
            <button
              type="button"
              onClick={() => onSelect(s.key)}
              aria-current={active ? 'step' : undefined}
              style={{
                all: 'unset',
                cursor: 'pointer',
                fontWeight: active ? 600 : 400,
                color: active ? Colors.BLACK : Colors.GREY_700,
                textDecoration: active ? 'none' : 'underline',
                textDecorationColor: Colors.GREY_400,
                textUnderlineOffset: 3,
              }}
            >
              {s.label}
            </button>
          </span>
        )
      })}
    </nav>
  )
}

function StopsStep({
  selectedRoute,
  selectedRouteId,
  setSelectedRouteId,
  onNext,
}: {
  selectedRoute: RouteSpec
  selectedRouteId: string
  setSelectedRouteId: (id: string) => void
  onNext: () => void
}) {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <InputSelect
          label="Pickup"
          value={selectedRouteId}
          onChange={(e) =>
            setSelectedRouteId((e.target as HTMLSelectElement).value)
          }
          options={ROUTES.map((r) => ({
            value: r.id,
            text: r.pickup.address,
          }))}
        />
        <InputText
          label="Dropoff"
          value={selectedRoute.dropoff.address}
          readOnly
          onChange={() => {}}
        />
      </div>

      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
        <Button color="black" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}

type Timing = 'asap' | 'eod' | 'future'

const TIMING_TOKENS = {
  textPrimary: '#1c1c1c',
  textSecondary: '#444444',
  textTertiary: '#7a7a7a',
  borderPrimary: 'rgba(208,211,211,0.6)',
  borderBold: '#1c1c1c',
  neutralBg: 'rgba(249,249,249,0.6)',
  readoutBg: '#FAFAF9',
  segTrack: '#efeeeb',
} as const

const PRIORITY_READOUT: Record<DispatchPriority, { driver: string; eta: string }> = {
  speed: { driver: 'Any available', eta: '~10:40am' },
  balanced: { driver: 'Default match', eta: '~10:55am' },
  quality: { driver: 'Top-rated', eta: '~11:10am' },
}

function OptionsStep({
  priority,
  setPriority,
  mobiles,
  onBack,
  onBook,
}: {
  priority: DispatchPriority
  setPriority: (p: DispatchPriority) => void
  mobiles: ClientInfo[]
  onBack: () => void
  onBook: () => void
}) {
  const [timing, setTiming] = useState<Timing>('asap')

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        color: TIMING_TOKENS.textPrimary,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            fontSize: 24,
            lineHeight: '32px',
            fontWeight: 600,
            letterSpacing: '-0.2px',
            color: TIMING_TOKENS.textPrimary,
          }}
        >
          When do you need this picked up?
        </div>
        <div
          style={{
            fontSize: 14,
            lineHeight: '21px',
            color: TIMING_TOKENS.textSecondary,
            maxWidth: 480,
          }}
        >
          Tell us when and what matters most — we&apos;ll match the right driver and surface the price.
        </div>
      </div>

      <ModesGrid value={timing} onChange={setTiming} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PrioritySegmented value={priority} onChange={setPriority} />
        <Readout priority={priority} />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 12,
        }}
      >
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button color="black" onClick={onBook} disabled={mobiles.length === 0}>
          Book ({mobiles.length} {mobiles.length === 1 ? 'driver' : 'drivers'} online)
        </Button>
      </div>
    </div>
  )
}

function ModesGrid({
  value,
  onChange,
}: {
  value: Timing
  onChange: (t: Timing) => void
}) {
  const tiles: Array<{
    key: Timing
    title: string
    subtitle: string
    icon: React.ReactNode
    disabled?: boolean
  }> = [
    {
      key: 'asap',
      title: 'ASAP',
      subtitle: 'Dispatch immediately',
      icon: <IconLightning />,
    },
    {
      key: 'eod',
      title: 'End of day',
      subtitle: 'Pickup today',
      icon: <IconClock />,
      disabled: true,
    },
    {
      key: 'future',
      title: 'Future date',
      subtitle: 'Book ahead',
      icon: <IconCalendar />,
      disabled: true,
    },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 10,
      }}
    >
      {tiles.map((t) => (
        <ModeTile
          key={t.key}
          active={t.key === value}
          disabled={t.disabled}
          title={t.title}
          subtitle={t.subtitle}
          icon={t.icon}
          onClick={() => onChange(t.key)}
        />
      ))}
    </div>
  )
}

function ModeTile({
  active,
  disabled,
  title,
  subtitle,
  icon,
  onClick,
}: {
  active: boolean
  disabled?: boolean
  title: string
  subtitle: string
  icon: React.ReactNode
  onClick: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        background: active ? '#fff' : TIMING_TOKENS.neutralBg,
        border: `1px solid ${
          active
            ? TIMING_TOKENS.borderBold
            : hover && !disabled
              ? 'rgba(28,28,28,0.3)'
              : TIMING_TOKENS.borderPrimary
        }`,
        borderRadius: 4,
        padding: '12px 14px',
        cursor: disabled ? 'default' : 'pointer',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        position: 'relative',
        boxShadow: active ? `0 0 0 0.5px ${TIMING_TOKENS.borderBold}` : 'none',
        transition:
          'border-color .2s ease, box-shadow .2s ease, background .2s ease',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            color: TIMING_TOKENS.textPrimary,
            display: 'inline-flex',
          }}
        >
          {icon}
        </span>
        <span
          aria-hidden
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: `1px solid ${
              active ? TIMING_TOKENS.textPrimary : TIMING_TOKENS.borderPrimary
            }`,
            background: active ? TIMING_TOKENS.textPrimary : '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.6)',
            transition:
              'opacity .2s ease, transform .25s cubic-bezier(.32,.72,0,1), background .2s ease, border-color .2s ease',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              color: '#fff',
              display: 'inline-flex',
              opacity: active ? 1 : 0,
              transition: 'opacity .2s ease .05s',
            }}
          >
            <IconCheck />
          </span>
        </span>
      </div>
      <div
        style={{
          fontSize: 14,
          fontWeight: 600,
          lineHeight: '21px',
          color: TIMING_TOKENS.textPrimary,
        }}
      >
        {title}
      </div>
      <div
        style={{
          fontSize: 10,
          lineHeight: '14px',
          color: TIMING_TOKENS.textSecondary,
        }}
      >
        {subtitle}
      </div>
    </button>
  )
}

function PrioritySegmented({
  value,
  onChange,
}: {
  value: DispatchPriority
  onChange: (p: DispatchPriority) => void
}) {
  const opts: Array<{ key: DispatchPriority; label: string; icon: React.ReactNode }> = [
    { key: 'speed', label: 'Speed', icon: <IconFast /> },
    { key: 'balanced', label: 'Balanced', icon: <IconBalanced /> },
    { key: 'quality', label: 'Quality', icon: <IconQuality /> },
  ]

  const containerRef = useRef<HTMLDivElement>(null)
  const btnRefs = useRef<Array<HTMLButtonElement | null>>([])
  const [indicator, setIndicator] = useState<{ x: number; w: number } | null>(null)
  const [animated, setAnimated] = useState(false)

  const activeIndex = opts.findIndex((o) => o.key === value)

  useLayoutEffect(() => {
    const container = containerRef.current
    const btn = btnRefs.current[activeIndex]
    if (!container || !btn) return
    const cr = container.getBoundingClientRect()
    const br = btn.getBoundingClientRect()
    setIndicator({ x: br.left - cr.left, w: br.width })
  }, [activeIndex])

  useEffect(() => {
    const onResize = () => {
      const container = containerRef.current
      const btn = btnRefs.current[activeIndex]
      if (!container || !btn) return
      const cr = container.getBoundingClientRect()
      const br = btn.getBoundingClientRect()
      setIndicator({ x: br.left - cr.left, w: br.width })
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [activeIndex])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        background: TIMING_TOKENS.segTrack,
        border: `0.5px solid ${TIMING_TOKENS.borderPrimary}`,
        borderRadius: 8,
        padding: 3,
        gap: 3,
        isolation: 'isolate',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 3,
          bottom: 3,
          left: 0,
          width: indicator?.w ?? 0,
          transform: `translateX(${indicator?.x ?? 0}px)`,
          background: '#fff',
          borderRadius: 6,
          boxShadow: `0 0.5px 1px rgba(0,0,0,0.1), 0 0 0 0.5px ${TIMING_TOKENS.borderPrimary}`,
          transition: animated
            ? 'transform .32s cubic-bezier(.32,.72,0,1), width .32s cubic-bezier(.32,.72,0,1)'
            : 'none',
          zIndex: 0,
          pointerEvents: 'none',
          opacity: indicator ? 1 : 0,
        }}
      />
      {opts.map((o, i) => {
        const active = o.key === value
        return (
          <button
            key={o.key}
            ref={(el) => {
              btnRefs.current[i] = el
            }}
            type="button"
            onClick={() => {
              setAnimated(true)
              onChange(o.key)
            }}
            style={{
              position: 'relative',
              zIndex: 1,
              background: 'transparent',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              color: active ? TIMING_TOKENS.textPrimary : TIMING_TOKENS.textSecondary,
              transition: 'color .2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '9px 10px',
              gap: 6,
              fontSize: 13,
              fontWeight: active ? 600 : 500,
              fontFamily: 'inherit',
            }}
          >
            <span
              style={{
                width: 13,
                height: 13,
                display: 'inline-flex',
              }}
            >
              {o.icon}
            </span>
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

function Readout({ priority }: { priority: DispatchPriority }) {
  const { driver, eta } = PRIORITY_READOUT[priority]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 14px',
        background: TIMING_TOKENS.readoutBg,
        border: `0.5px solid ${TIMING_TOKENS.borderPrimary}`,
        borderRadius: 6,
        fontSize: 12,
        lineHeight: '16px',
      }}
    >
      <div style={{ color: TIMING_TOKENS.textTertiary }}>
        Driver:{' '}
        <b style={{ color: TIMING_TOKENS.textPrimary, fontWeight: 600 }}>{driver}</b>
      </div>
      <div style={{ color: TIMING_TOKENS.textTertiary }}>
        ETA:{' '}
        <b style={{ color: TIMING_TOKENS.textPrimary, fontWeight: 600 }}>{eta}</b>
      </div>
    </div>
  )
}

function IconLightning() {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%">
      <path d="M9 1L3 9h4l-1 6 7-8H9l1-6z" fill="currentColor" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%">
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4" fill="none" />
      <path
        d="M8 4.5V8l2.2 1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function IconCalendar() {
  return (
    <svg viewBox="0 0 16 16" width="100%" height="100%">
      <rect
        x="2.5"
        y="3.5"
        width="11"
        height="10"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M6 2v3M10 2v3M2.5 6.5h11"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg viewBox="0 0 8 8" width="100%" height="100%">
      <path
        d="M1.5 4l1.8 1.8 3.5-3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

function IconFast() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path d="M7 1L3 7h2.5l-.5 6L9.5 6H7l.5-5z" fill="currentColor" />
    </svg>
  )
}

function IconBalanced() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <circle cx="7" cy="7" r="2" fill="currentColor" />
    </svg>
  )
}

function IconQuality() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path
        d="M7 1l1.6 3.6 3.9.3-3 2.7.9 3.9L7 9.5 3.6 11.5l.9-3.9-3-2.7 3.9-.3L7 1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
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
    <section>
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
