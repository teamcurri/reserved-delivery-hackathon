'use client'

import { useEffect, useState } from 'react'
import { Button, Colors, Heading, Text } from '@curri/ui'
import {
  type Blast,
  type ClientInfo,
  type DispatchEvent,
  type SessionState,
} from '@hackathon/shared'
import { DispatchMap } from '@/components/DispatchMap'

export const HEADER_HEIGHT = 56
export const MAP_HEIGHT = 260
const STRIP_HEIGHT = 24
const STRIP_COLOR = '#efb14e'
const BLACK_BUTTON_BG = '#1c1c1c'

const PPE_CHIP_BG = '#f4ffc7'
const RESERVED_CHIP_BG = '#d6eafa'
const OPEN_BLAST_CHIP_BG = '#fce7d8'

export function DispatchView({
  blast,
  state,
  me,
  clientId,
  dispatch,
}: {
  blast: Blast
  state: SessionState
  me: ClientInfo | undefined
  clientId: string
  dispatch: (e: DispatchEvent) => void
}) {
  const remainingMs = useCountdown(blast.expiresAt)
  const remainingSec = Math.ceil(remainingMs / 1000)
  const delivery = state.delivery
  if (!delivery) return null

  const pricePerMile =
    delivery.totalDistanceMi > 0
      ? (delivery.price / delivery.totalDistanceMi).toFixed(2)
      : null

  return (
    <main
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: '#fcfcfc',
        paddingBottom: 120,
      }}
    >
      <Header label="Claim delivery" remainingSec={remainingSec} />

      <div style={{ height: HEADER_HEIGHT }} />

      {me ? (
        <div style={{ padding: '8px 16px 0' }}>
          <DispatchMap state={state} mobiles={[me]} selfId={clientId} height={MAP_HEIGHT} />
        </div>
      ) : null}

      <StatusStrip text={blast.reserved ? 'RESERVED OFFER' : 'OPEN BLAST'} />

      <section style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <PriceHero
          price={delivery.price}
          totalDistanceMi={delivery.totalDistanceMi}
          pricePerMile={pricePerMile}
          reserved={blast.reserved}
        />

        <ChipsRow reserved={blast.reserved} ppe={delivery.ppe} />

        <Divider />

        <PayloadSummary
          totalItems={delivery.totalItems}
          totalWeightLbs={delivery.totalWeightLbs}
          description={delivery.description}
        />

        <Divider />

        <StopsList pickup={delivery.pickup} dropoff={delivery.dropoff} />

        <Divider />

        <PaySummary price={delivery.price} />
      </section>

      <BottomBar
        reserved={blast.reserved}
        remainingSec={remainingSec}
        onAccept={() =>
          dispatch({ type: 'delivery:claim', payload: { blastId: blast.blastId } })
        }
        onPass={() =>
          dispatch({ type: 'delivery:reject', payload: { blastId: blast.blastId } })
        }
      />
    </main>
  )
}

export function Header({
  label,
  remainingSec,
}: {
  label: string
  remainingSec?: number
}) {
  const showCountdown = typeof remainingSec === 'number'
  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: HEADER_HEIGHT,
        background: '#fff',
        borderBottom: `1px solid ${Colors.GREY_200}`,
        boxShadow: '0 1px 8px rgba(9,30,66,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
      }}
    >
      <Text size="md">{label}</Text>
      {showCountdown ? (
        <div
          style={{
            position: 'absolute',
            right: 16,
            top: '50%',
            transform: 'translateY(-50%)',
            font: '600 14px/1 Inter, system-ui, sans-serif',
            color: (remainingSec as number) <= 10 ? Colors.RED_500 : Colors.GREY_900,
          }}
        >
          {remainingSec}s
        </div>
      ) : null}
    </header>
  )
}

export function StatusStrip({
  text,
  background = STRIP_COLOR,
}: {
  text: string
  background?: string
}) {
  return (
    <div
      style={{
        height: STRIP_HEIGHT,
        background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        font: '600 11px/14px Inter, system-ui, sans-serif',
        letterSpacing: 0.22,
        textTransform: 'uppercase',
        color: '#1c1c1c',
        marginTop: 8,
      }}
    >
      {text}
    </div>
  )
}

function PriceHero({
  price,
  totalDistanceMi,
  pricePerMile,
  reserved,
}: {
  price: number
  totalDistanceMi: number
  pricePerMile: string | null
  reserved: boolean
}) {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <div
          style={{
            font: '500 36px/44px Inter, system-ui, sans-serif',
            letterSpacing: -0.72,
            color: '#1c1c1c',
          }}
        >
          ${price.toFixed(2)}
        </div>
        {pricePerMile ? (
          <div
            style={{
              font: '500 12px/18px Inter, system-ui, sans-serif',
              color: Colors.GREY_700,
            }}
          >
            (${pricePerMile}/mi) incl. fees + tolls
          </div>
        ) : null}
      </div>
      <div style={{ font: '500 12px/18px Inter, system-ui, sans-serif', color: '#1c1c1c' }}>
        {totalDistanceMi.toFixed(1)} mi total
        <span style={{ color: 'rgba(208,211,211,0.8)', margin: '0 6px' }}>|</span>
        <span style={{ color: '#1c1c1c' }}>⚡ {reserved ? 'Reserved · pickup now' : 'Pickup now'}</span>
      </div>
    </div>
  )
}

function ChipsRow({ reserved, ppe }: { reserved: boolean; ppe: string[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px 4px' }}>
      <Chip bg={reserved ? RESERVED_CHIP_BG : OPEN_BLAST_CHIP_BG}>
        {reserved ? 'Reserved · 30s claim' : 'First claim wins'}
      </Chip>
      {ppe.map((item) => (
        <Chip key={item} bg={PPE_CHIP_BG}>
          {item}
        </Chip>
      ))}
    </div>
  )
}

function Divider() {
  return <div style={{ height: 1, background: Colors.GREY_200 }} />
}

function Chip({ bg, children }: { bg: string; children: React.ReactNode }) {
  return (
    <span
      style={{
        background: bg,
        padding: '8px 16px',
        borderRadius: 64,
        font: '600 14px/21px Inter, system-ui, sans-serif',
        color: '#000',
      }}
    >
      {children}
    </span>
  )
}

function PayloadSummary({
  totalItems,
  totalWeightLbs,
  description,
}: {
  totalItems: number
  totalWeightLbs: number
  description: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text size="sm">Payload summary</Text>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
        <Tile value={String(totalItems)} label="Total items" />
        <Tile value={`${totalWeightLbs} lbs`} label="Total wt." />
      </div>
      <div
        style={{
          background: '#fff',
          border: `0.5px solid rgba(208,211,211,0.6)`,
          borderRadius: 8,
          padding: '12px 16px',
        }}
      >
        <div style={{ font: '500 12px/15px Inter, system-ui, sans-serif', color: Colors.GREY_700 }}>
          Item description
        </div>
        <div style={{ marginTop: 4, font: '500 14px/20px Inter, system-ui, sans-serif', color: '#1c1c1c' }}>
          {description}
        </div>
      </div>
    </div>
  )
}

function Tile({ value, label }: { value: string; label: string }) {
  return (
    <div
      style={{
        background: '#fff',
        border: `0.5px solid rgba(208,211,211,0.6)`,
        borderRadius: 8,
        padding: '12px 16px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          font: '500 18px/24px Inter, system-ui, sans-serif',
          letterSpacing: -0.36,
          color: '#1c1c1c',
        }}
      >
        {value}
      </div>
      <div style={{ font: '500 12px/15px Inter, system-ui, sans-serif', color: Colors.GREY_700 }}>
        {label}
      </div>
    </div>
  )
}

function StopsList({ pickup, dropoff }: { pickup: string; dropoff: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Text size="sm">Stops (2)</Text>
      <Stop num={1} kind="Pickup" address={pickup} />
      <Stop num={2} kind="Dropoff" address={dropoff} />
    </div>
  )
}

function Stop({
  num,
  kind,
  address,
}: {
  num: number
  kind: 'Pickup' | 'Dropoff'
  address: string
}) {
  const [primary, ...rest] = address.split(',').map((s) => s.trim())
  const city = rest[0] ?? ''
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
      <span
        style={{
          background: '#1d1f21',
          color: '#fff',
          font: '600 11px/14px Inter, system-ui, sans-serif',
          letterSpacing: 0.22,
          width: 18,
          height: 18,
          borderRadius: 4,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        {num}
      </span>
      <div style={{ flex: 1 }}>
        <div style={{ font: '500 14px/20px Inter, system-ui, sans-serif', color: '#1c1c1c' }}>
          {primary}
        </div>
        <div style={{ font: '500 12px/18px Inter, system-ui, sans-serif', color: Colors.GREY_700 }}>
          ({kind}
          {city ? ` · ${city}` : ''})
        </div>
      </div>
    </div>
  )
}

function PaySummary({ price }: { price: number }) {
  return (
    <div
      style={{
        background: Colors.GREY_100,
        borderRadius: 12,
        padding: 16,
      }}
    >
      <SummaryRow label="Delivery base pay" value={`$${price.toFixed(2)}`} />
      <SummaryRow label="Tolls" value="$0.00" />
      <div
        style={{
          marginTop: 12,
          paddingTop: 12,
          borderTop: `1px solid ${Colors.GREY_300}`,
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Text size="md" color={Colors.GREY_700}>
          Total
        </Text>
        <div
          style={{
            font: '500 24px/28px Inter, system-ui, sans-serif',
            letterSpacing: -0.48,
            color: '#1c1c1c',
          }}
        >
          ${price.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        padding: '4px 0',
      }}
    >
      <div style={{ font: '500 11px/14px Inter, system-ui, sans-serif', color: Colors.GREY_700, letterSpacing: 0.22 }}>
        {label}
      </div>
      <div style={{ font: '600 14px/20px Inter, system-ui, sans-serif', color: '#1c1c1c' }}>{value}</div>
    </div>
  )
}

function BottomBar({
  reserved,
  remainingSec,
  onAccept,
  onPass,
}: {
  reserved: boolean
  remainingSec: number
  onAccept: () => void
  onPass: () => void
}) {
  const expiring = remainingSec <= 5
  return (
    <div
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        padding: '12px 16px 20px',
        background: '#fff',
        borderTop: `1px solid ${Colors.GREY_200}`,
        boxShadow: '0 -2px 16px rgba(9,30,66,0.08)',
        zIndex: 20,
      }}
    >
      <div
        style={{
          background: BLACK_BUTTON_BG,
          color: '#fff',
          borderRadius: 4,
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          font: '600 16px/24px Inter, system-ui, sans-serif',
          opacity: expiring ? 0.85 : 1,
        }}
        onClick={onAccept}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onAccept()
          }
        }}
      >
        Claim delivery
      </div>
      {reserved ? (
        <div style={{ marginTop: 8 }}>
          <Button variant="outlined" color="red" isFullWidth onClick={onPass}>
            Pass
          </Button>
        </div>
      ) : null}
      <div
        style={{
          marginTop: 8,
          textAlign: 'center',
          font: '500 12px/18px Inter, system-ui, sans-serif',
          color: Colors.GREY_700,
        }}
      >
        By claiming you agree to the requirements
      </div>
    </div>
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
