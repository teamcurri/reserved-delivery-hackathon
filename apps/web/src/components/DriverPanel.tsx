'use client'

import { useMemo } from 'react'
import { Heading, Text, Colors } from '@curri/ui'
import {
  type ClientInfo,
  type DriverEntry,
  type OnboardingStep,
  type SessionState,
  SD_CENTER,
  approxMiles,
  driverScore,
  initialBlend,
} from '@hackathon/shared'

const FALLBACK_ENTRY: DriverEntry = {
  blend: initialBlend(),
  location: SD_CENTER,
}

export function entryFor(
  state: SessionState | undefined,
  clientId: string,
): DriverEntry {
  return state?.drivers[clientId] ?? FALLBACK_ENTRY
}

export function prettyStep(step: OnboardingStep): string {
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

export function DriverPanel({
  state,
  mobiles,
}: {
  state: SessionState | undefined
  mobiles: ClientInfo[]
}) {
  const activeIds = useMemo(
    () =>
      new Set(
        (state?.blasts ?? [])
          .filter((b) => b.outcome === 'pending')
          .map((b) => b.driverId),
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

function Th({ children }: { children: React.ReactNode }) {
  return <th style={{ padding: '6px 8px', fontWeight: 600 }}>{children}</th>
}

function Td({ children }: { children: React.ReactNode }) {
  return (
    <td style={{ padding: '6px 8px', borderTop: `1px solid ${Colors.GREY_200}` }}>
      {children}
    </td>
  )
}
