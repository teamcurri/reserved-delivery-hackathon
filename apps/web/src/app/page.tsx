'use client'

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'
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
  type SessionState,
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

type WsStatus = 'idle' | 'connecting' | 'joined' | 'error'

const WS_STATUS_META: Record<
  WsStatus,
  { label: string; dot: string; ring: string; pulse: boolean }
> = {
  idle: { label: 'Idle', dot: '#9ca3af', ring: 'rgba(156,163,175,0.18)', pulse: false },
  connecting: {
    label: 'Connecting',
    dot: '#f59e0b',
    ring: 'rgba(245,158,11,0.22)',
    pulse: true,
  },
  joined: { label: 'Live', dot: '#10b981', ring: 'rgba(16,185,129,0.22)', pulse: true },
  error: { label: 'Error', dot: '#ef4444', ring: 'rgba(239,68,68,0.22)', pulse: false },
}

function SessionStatusPill({
  wsStatus,
  error,
  sessionId,
}: {
  wsStatus: WsStatus
  error: string | undefined
  sessionId: string
}) {
  const meta = WS_STATUS_META[wsStatus]
  const shortId = sessionId.length > 8 ? sessionId.slice(0, 8) : sessionId
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard?.writeText(sessionId).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 1200)
      },
      () => {},
    )
  }

  return (
    <div
      title={error ? `${meta.label} — ${error}` : meta.label}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 10px 6px 8px',
        background: '#fff',
        border: `0.5px solid ${TIMING_TOKENS.borderPrimary}`,
        borderRadius: 999,
        boxShadow: '0 0.5px 1px rgba(0,0,0,0.04)',
        fontSize: 12,
        lineHeight: '16px',
        color: TIMING_TOKENS.textSecondary,
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'relative',
          width: 14,
          height: 14,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {meta.pulse ? (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: meta.ring,
              animation: 'sessionPulse 1.6s ease-out infinite',
            }}
          />
        ) : null}
        <span
          style={{
            position: 'relative',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: meta.dot,
            boxShadow: `0 0 0 2px ${meta.ring}`,
          }}
        />
      </span>
      <span style={{ fontWeight: 600, color: TIMING_TOKENS.textPrimary }}>
        {meta.label}
      </span>
      <span aria-hidden style={{ width: 1, height: 12, background: TIMING_TOKENS.borderPrimary }} />
      <button
        type="button"
        onClick={copy}
        title={copied ? 'Copied' : 'Copy session id'}
        style={{
          all: 'unset',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: TIMING_TOKENS.textTertiary,
        }}
      >
        <span>session</span>
        <code
          style={{
            fontFamily:
              "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            fontSize: 11,
            padding: '2px 6px',
            borderRadius: 4,
            background: TIMING_TOKENS.readoutBg,
            border: `0.5px solid ${TIMING_TOKENS.borderPrimary}`,
            color: TIMING_TOKENS.textPrimary,
            letterSpacing: '0.2px',
          }}
        >
          {copied ? 'copied' : shortId}
        </code>
      </button>
      <style>{`@keyframes sessionPulse {
        0% { transform: scale(0.6); opacity: 0.9; }
        100% { transform: scale(1.8); opacity: 0; }
      }`}</style>
    </div>
  )
}

function isDispatchPriority(value: string | null): value is DispatchPriority {
  return value === 'speed' || value === 'balanced' || value === 'quality'
}

export default function DesktopPage() {
  const searchParams = useSearchParams()
  const previewView = searchParams.get('view')
  const previewPriorityParam = searchParams.get('priority')
  const isTrackingPreview = previewView === 'tracking'

  const [sessionId, setSessionId] = useState<string | undefined>()
  const [creating, setCreating] = useState(true)
  const [selectedRouteId, setSelectedRouteId] = useState<string>(DEFAULT_ROUTE_ID)
  const [priority, setPriority] = useState<DispatchPriority>(() =>
    isDispatchPriority(previewPriorityParam) ? previewPriorityParam : 'speed',
  )
  const selectedRoute: RouteSpec = getRoute(selectedRouteId) ?? DEFAULT_ROUTE

  const previewState = useMemo<SessionState>(
    () => ({
      status: 'blasting',
      delivery: {
        id: 'preview',
        pickup: selectedRoute.pickup.address,
        dropoff: selectedRoute.dropoff.address,
        priority,
        createdAt: Date.now(),
      },
      blasts: [],
      drivers: {},
    }),
    [selectedRoute, priority],
  )

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

  if (isTrackingPreview) {
    return (
      <TrackingLayout
        state={previewState}
        priority={priority}
        selectedRoute={selectedRoute}
        mobiles={[]}
        sessionId={sessionId ?? 'PREVIEW01'}
        dispatch={() => {}}
      />
    )
  }

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
  // Map only shows drivers currently being blasted (pending). At-rest
  // drivers are hidden so the visual focus is on the wave the algo lit up.
  const pendingDriverIds = new Set(
    (state?.blasts ?? [])
      .filter((b) => b.outcome === 'pending')
      .map((b) => b.driverId),
  )
  const pendingMobiles = mobiles.filter((c) => pendingDriverIds.has(c.clientId))

  if (state?.status === 'blasting' && state.delivery) {
    return (
      <TrackingLayout
        state={state}
        priority={priority}
        selectedRoute={selectedRoute}
        mobiles={mobiles}
        sessionId={sessionId}
        dispatch={dispatch}
      />
    )
  }

  return (
    <main style={{ maxWidth: 1024, margin: '0 auto', padding: 32 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <SessionStatusPill wsStatus={wsStatus} error={error} sessionId={sessionId} />
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
          mobiles={pendingMobiles}
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
        pickupLatLng: { lat: selectedRoute.pickup.lat, lng: selectedRoute.pickup.lng },
        dropoff: selectedRoute.dropoff.address,
        dropoffLatLng: { lat: selectedRoute.dropoff.lat, lng: selectedRoute.dropoff.lng },
        priority,
        ...selectedRoute.details,
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
    { key: 'options', label: 'Timing' },
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

// ============================================================================
// Tracking layout (post-book)
// ============================================================================

const TRACK_ACCENT = '#0FAF96'

const TRACK_TIMING_LABEL: Record<DispatchPriority, string> = {
  speed: 'Rush',
  balanced: 'Balanced',
  quality: 'Quality',
}

type BlastStatusTone = 'info' | 'progress' | 'warning'

type BlastStatusCopy = {
  title: string
  sub: string
  tone: BlastStatusTone
}

/**
 * Derive the title/sub for the tracking-page status card from real blast
 * activity. The shape changes with priority because each tier dispatches
 * differently:
 *
 *  - quality: 1 reserved driver, then fallback waves of 2
 *  - balanced: waves of 3
 *  - speed: waves of 4 (first claim wins)
 *
 * Outcomes (`pending` / `rejected` / `expired`) drive the copy so the panel
 * keeps narrating what's happening as drivers respond.
 */
function getBlastStatusCopy(
  priority: DispatchPriority,
  blasts: Blast[],
  mobiles: ClientInfo[],
): BlastStatusCopy {
  const pendingCount = blasts.filter((b) => b.outcome === 'pending').length
  const rejectedCount = blasts.filter((b) => b.outcome === 'rejected').length
  const expiredCount = blasts.filter((b) => b.outcome === 'expired').length
  const closedCount = rejectedCount + expiredCount
  const total = blasts.length
  const last = blasts[blasts.length - 1]

  const driverName = (id: string | undefined): string | undefined => {
    if (!id) return undefined
    const m = mobiles.find((c) => c.clientId === id)
    return m?.identity?.name?.trim() || undefined
  }

  if (priority === 'quality') {
    if (total === 0) {
      return {
        title: 'Selecting top-rated driver',
        sub: 'Ranking nearby providers…',
        tone: 'info',
      }
    }
    if (last?.outcome === 'pending') {
      const name = driverName(last.driverId)
      if (last.reserved) {
        return {
          title: name ? `Reserved for ${name}` : 'Pinging top-rated driver',
          sub: '30-second exclusive claim window…',
          tone: 'progress',
        }
      }
      return {
        title:
          pendingCount > 1
            ? `Pinging next ${pendingCount} drivers`
            : name
              ? `Pinging ${name}`
              : 'Pinging next-best driver',
        sub:
          closedCount > 0
            ? `${closedCount} declined • expanding the search…`
            : 'Reviewing the offer…',
        tone: 'progress',
      }
    }
    const lastName = driverName(last?.driverId)
    if (last?.outcome === 'expired') {
      return {
        title: lastName ? `${lastName} didn’t respond` : 'No response yet',
        sub: 'Trying next-best match…',
        tone: 'warning',
      }
    }
    return {
      title: lastName ? `${lastName} declined` : 'Driver declined',
      sub: 'Trying next-best match…',
      tone: 'warning',
    }
  }

  if (priority === 'balanced') {
    if (total === 0) {
      return {
        title: 'Matching drivers in waves',
        sub: 'Building first wave…',
        tone: 'info',
      }
    }
    if (pendingCount > 0) {
      return {
        title: `Offering to ${pendingCount} ${pendingCount === 1 ? 'driver' : 'drivers'}`,
        sub:
          closedCount > 0
            ? `${closedCount} declined so far • waiting on this wave…`
            : 'Best matches reviewing the offer…',
        tone: 'progress',
      }
    }
    return {
      title: `${closedCount} ${closedCount === 1 ? 'driver' : 'drivers'} declined`,
      sub: 'Expanding to the next wave…',
      tone: 'warning',
    }
  }

  // speed
  if (total === 0) {
    return {
      title: 'Blasting available drivers',
      sub: 'Searching for nearby providers…',
      tone: 'info',
    }
  }
  if (pendingCount > 0 && closedCount === 0) {
    return {
      title: `Offered to ${total} ${total === 1 ? 'driver' : 'drivers'}`,
      sub: 'First to claim wins the run…',
      tone: 'progress',
    }
  }
  if (pendingCount > 0) {
    return {
      title: `${pendingCount} reviewing • ${closedCount} passed`,
      sub: 'Still waiting on a claim…',
      tone: 'progress',
    }
  }
  return {
    title: `${closedCount} ${closedCount === 1 ? 'driver' : 'drivers'} passed`,
    sub: 'Pinging more drivers nearby…',
    tone: 'warning',
  }
}

function makeDeliveryId(sessionId: string): string {
  const cleaned = sessionId.replace(/[^A-Za-z0-9]/g, '').toUpperCase()
  return `del_${cleaned.slice(0, 8) || 'XXXXXXXX'}#`
}

function TrackingLayout({
  state,
  priority,
  selectedRoute,
  mobiles,
  sessionId,
  dispatch,
}: {
  state: SessionState
  priority: DispatchPriority
  selectedRoute: RouteSpec
  mobiles: ClientInfo[]
  sessionId: string
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  const effectivePriority = state.delivery?.priority ?? priority
  const deliveryId = makeDeliveryId(sessionId)

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
        color: TIMING_TOKENS.textPrimary,
      }}
    >
      <TrackingHeader />
      <section
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 420px) minmax(0, 1fr)',
          alignItems: 'stretch',
          height: 'calc(100vh - 44px)',
          minHeight: 0,
        }}
      >
        <TrackingPanel
          deliveryId={deliveryId}
          timing={TRACK_TIMING_LABEL[effectivePriority]}
          priority={effectivePriority}
          pickup={selectedRoute.pickup.address}
          dropoff={selectedRoute.dropoff.address}
          blasts={state.blasts}
          mobiles={mobiles}
          dispatch={dispatch}
        />
        <TrackingMapPane
          state={state}
          mobiles={mobiles}
          pickup={selectedRoute.pickup.address}
          dropoff={selectedRoute.dropoff.address}
        />
      </section>
    </main>
  )
}

function TrackingHeader() {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        background: '#ecebe8',
        borderBottom: `1px solid ${TIMING_TOKENS.borderPrimary}`,
        height: 44,
        flexShrink: 0,
      }}
    >
      <div style={{ fontSize: 13, color: '#444', fontWeight: 500 }}>
        Track delivery
      </div>
      <button
        type="button"
        style={{
          all: 'unset',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: TRACK_ACCENT,
          color: '#fff',
          padding: '5px 12px',
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 500,
          cursor: 'pointer',
          lineHeight: 1.4,
        }}
      >
        <span style={{ width: 12, height: 12, display: 'inline-flex' }}>
          <IconChat />
        </span>
        Chat with us
      </button>
    </header>
  )
}

function TrackingPanel({
  deliveryId,
  timing,
  priority,
  pickup,
  dropoff,
  blasts,
  mobiles,
  dispatch,
}: {
  deliveryId: string
  timing: string
  priority: DispatchPriority
  pickup: string
  dropoff: string
  blasts: Blast[]
  mobiles: ClientInfo[]
  dispatch: (e: { type: string; payload?: unknown }) => void
}) {
  return (
    <div
      style={{
        padding: '20px 22px',
        borderRight: `1px solid ${TIMING_TOKENS.borderPrimary}`,
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 22,
        background: '#fff',
      }}
    >
      <DetailsCard deliveryId={deliveryId} timing={timing} />
      <ActionStack onCancel={() => dispatch({ type: 'delivery:restart' })} />
      <BlastStatusCard priority={priority} blasts={blasts} mobiles={mobiles} />
      <TimelineSection />
      <StopsSection pickup={pickup} dropoff={dropoff} />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
      {children}
    </div>
  )
}

function DetailsCard({
  deliveryId,
  timing,
}: {
  deliveryId: string
  timing: string
}) {
  return (
    <section>
      <SectionLabel>Delivery details</SectionLabel>
      <div
        style={{
          border: `1px solid ${TIMING_TOKENS.borderPrimary}`,
          borderRadius: 8,
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          background: '#fff',
        }}
      >
        <DetailRow label="Delivery ID" value={deliveryId} copyable />
        <DetailRow label="Timing" value={timing} />
      </div>
    </section>
  )
}

function DetailRow({
  label,
  value,
  copyable,
}: {
  label: string
  value: string
  copyable?: boolean
}) {
  const [copied, setCopied] = useState(false)
  const copy = () => {
    navigator.clipboard?.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1200)
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 13,
      }}
    >
      <span style={{ color: TIMING_TOKENS.textTertiary }}>{label}</span>
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: TIMING_TOKENS.textPrimary,
          fontWeight: 500,
        }}
      >
        {value}
        {copyable ? (
          <button
            type="button"
            onClick={copy}
            title={copied ? 'Copied' : 'Copy'}
            style={{
              all: 'unset',
              width: 14,
              height: 14,
              cursor: 'pointer',
              color: copied ? TRACK_ACCENT : TIMING_TOKENS.textTertiary,
              display: 'inline-flex',
            }}
          >
            <IconCopy />
          </button>
        ) : null}
      </span>
    </div>
  )
}

function ActionStack({ onCancel }: { onCancel: () => void }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <ActionButton primary icon={<IconShare />} label="Share tracking" />
      <ActionButton icon={<IconLink />} label="Copy tracking link" />
      <ActionButton icon={<IconEdit />} label="Edit delivery details" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <ActionButton icon={<IconReschedule />} label="Reschedule" />
        <ActionButton
          icon={<IconCancel />}
          label="Cancel"
          destructive
          onClick={onCancel}
        />
      </div>
    </div>
  )
}

function ActionButton({
  icon,
  label,
  primary,
  destructive,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  primary?: boolean
  destructive?: boolean
  onClick?: () => void
}) {
  const [hover, setHover] = useState(false)
  const baseBg = primary ? TRACK_ACCENT : '#fff'
  const baseColor = primary ? '#fff' : destructive ? '#c43d3d' : TIMING_TOKENS.textPrimary
  const baseBorder = primary
    ? TRACK_ACCENT
    : destructive
      ? 'rgba(196,61,61,0.25)'
      : TIMING_TOKENS.borderPrimary
  const hoverBg = primary
    ? '#0d9c85'
    : destructive
      ? 'rgba(196,61,61,0.06)'
      : '#fafafa'
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: 'unset',
        boxSizing: 'border-box',
        background: hover ? hoverBg : baseBg,
        border: `1px solid ${baseBorder}`,
        borderRadius: 6,
        padding: '9px 12px',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        fontSize: 13,
        fontWeight: 500,
        color: baseColor,
        transition: 'background .15s ease',
      }}
    >
      <span style={{ width: 14, height: 14, display: 'inline-flex' }}>{icon}</span>
      {label}
    </button>
  )
}

function BlastStatusCard({
  priority,
  blasts,
  mobiles,
}: {
  priority: DispatchPriority
  blasts: Blast[]
  mobiles: ClientInfo[]
}) {
  const copy = useMemo(
    () => getBlastStatusCopy(priority, blasts, mobiles),
    [priority, blasts, mobiles],
  )
  const barColor = copy.tone === 'warning' ? '#c98a2a' : TRACK_ACCENT
  return (
    <div
      style={{
        border: `1px solid ${TIMING_TOKENS.borderPrimary}`,
        borderRadius: 8,
        padding: '14px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        alignItems: 'center',
        background: '#fff',
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: TIMING_TOKENS.textPrimary }}>
        {copy.title}
      </div>
      <IndeterminateBar color={barColor} />
      <div style={{ fontSize: 12, color: TIMING_TOKENS.textTertiary, textAlign: 'center' }}>
        {copy.sub}
      </div>
    </div>
  )
}

function IndeterminateBar({ color = TRACK_ACCENT }: { color?: string }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 6,
        background: '#ececec',
        borderRadius: 999,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '40%',
          background: color,
          borderRadius: 999,
          animation: 'trackBlast 1.6s cubic-bezier(.4,0,.6,1) infinite',
          transition: 'background .25s ease',
        }}
      />
      <style>{`@keyframes trackBlast {
        0% { left: -45%; }
        100% { left: 100%; }
      }`}</style>
    </div>
  )
}

function TimelineSection() {
  const [now] = useState(() => new Date())
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
  const long = now.toLocaleString([], {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
  return (
    <section>
      <SectionLabel>Timeline</SectionLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'auto auto 1fr', gap: 12, alignItems: 'start' }}>
        <span style={{ fontSize: 12, color: TIMING_TOKENS.textTertiary, paddingTop: 1 }}>
          {time}
        </span>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            background: TRACK_ACCENT,
            boxShadow: `0 0 0 3px rgba(15,175,150,0.18)`,
            marginTop: 5,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: 13, color: TIMING_TOKENS.textPrimary }}>
            Location tracking available soon
          </div>
          <div style={{ fontSize: 11, color: TIMING_TOKENS.textTertiary }}>
            {long}
          </div>
        </div>
      </div>
      <button
        type="button"
        style={{
          all: 'unset',
          marginTop: 14,
          width: '100%',
          textAlign: 'center',
          fontSize: 11,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: TIMING_TOKENS.textTertiary,
          cursor: 'pointer',
          padding: '4px 0',
        }}
      >
        More ⌄
      </button>
    </section>
  )
}

function StopsSection({ pickup, dropoff }: { pickup: string; dropoff: string }) {
  return (
    <section>
      <SectionLabel>Stops</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <StopRow num={1} address={pickup} />
        <StopConnector />
        <StopRow num={2} address={dropoff} />
      </div>
    </section>
  )
}

function StopRow({ num, address }: { num: number; address: string }) {
  const [line1, ...rest] = address.split(',')
  const line2 = rest.join(',').trim()
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 10, alignItems: 'start' }}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          background: TIMING_TOKENS.textPrimary,
          color: '#fff',
          fontSize: 11,
          fontWeight: 600,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 1,
        }}
      >
        {num}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{line1.trim()}</div>
        {line2 ? (
          <div style={{ fontSize: 12, color: TIMING_TOKENS.textTertiary }}>
            {line2}
          </div>
        ) : null}
      </div>
    </div>
  )
}

function StopConnector() {
  return (
    <span
      aria-hidden
      style={{
        marginLeft: 8,
        width: 1,
        height: 18,
        background: TIMING_TOKENS.borderPrimary,
        display: 'block',
      }}
    />
  )
}

function TrackingMapPane({
  state,
  mobiles,
  pickup,
  dropoff,
}: {
  state: SessionState
  mobiles: ClientInfo[]
  pickup: string
  dropoff: string
}) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <DispatchMap
        state={state}
        mobiles={mobiles}
        compose={{ pickup, dropoff }}
        height="100%"
        borderRadius={0}
      />
      <EtaBanner />
    </div>
  )
}

function EtaBanner() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
        background: '#fff',
        minWidth: 200,
        fontFamily: 'inherit',
      }}
    >
      <div
        style={{
          padding: '6px 12px',
          background: '#fff',
          color: TIMING_TOKENS.textPrimary,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.04em',
          textTransform: 'uppercase',
          borderBottom: `1px solid ${TIMING_TOKENS.borderPrimary}`,
        }}
      >
        Pickup ETA <span style={{ color: TIMING_TOKENS.textTertiary, fontWeight: 500 }}>—</span>
      </div>
      <div
        style={{
          padding: '10px 12px',
          background: '#1c1c1c',
          color: '#fff',
          display: 'flex',
          alignItems: 'baseline',
          gap: 8,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, lineHeight: 1 }}>—</span>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
          Awaiting driver
        </span>
      </div>
    </div>
  )
}

function IconChat() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path
        d="M2 3.5a1.5 1.5 0 0 1 1.5-1.5h7A1.5 1.5 0 0 1 12 3.5v5A1.5 1.5 0 0 1 10.5 10H5l-3 2.5V3.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconCopy() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <rect x="3.5" y="3.5" width="7" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path
        d="M5.5 3.5V2.5a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-1"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  )
}

function IconShare() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path
        d="M7 9V2.5M7 2.5l-2.5 2.5M7 2.5l2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M2.5 8.5v2.5a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V8.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function IconLink() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path
        d="M6 8a2.5 2.5 0 0 0 3.5 0L11 6.5a2.5 2.5 0 1 0-3.5-3.5L7 3.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M8 6a2.5 2.5 0 0 0-3.5 0L3 7.5A2.5 2.5 0 1 0 6.5 11L7 10.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function IconEdit() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path
        d="M2.5 11.5l1-3 6-6 2 2-6 6-3 1z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M8 4l2 2" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function IconReschedule() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.3" fill="none" />
      <path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

function IconCancel() {
  return (
    <svg viewBox="0 0 14 14" width="100%" height="100%">
      <path
        d="M3.5 3.5l7 7M10.5 3.5l-7 7"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  )
}
