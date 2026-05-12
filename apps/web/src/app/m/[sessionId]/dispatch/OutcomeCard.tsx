'use client'

import { Colors, Text } from '@curri/ui'
import type { Delivery } from '@hackathon/shared'

/**
 * Replaces the ScoreCard in the mobile online layout once a delivery is
 * fulfilled. Same vertical real-estate as the score card so the rest of the
 * page (header, map, strip) doesn't shift.
 */
export function OutcomeCard({
  wasMe,
  delivery,
}: {
  wasMe: boolean
  delivery: Delivery | undefined
}) {
  return (
    <section
      style={{
        marginTop: 16,
        padding: 16,
        background: wasMe ? '#dff5d4' : Colors.GREY_100,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div
        style={{
          font: '500 24px/28px Inter, system-ui, sans-serif',
          letterSpacing: -0.48,
          color: '#1c1c1c',
        }}
      >
        {wasMe ? 'You claimed it' : 'Another driver claimed it'}
      </div>
      {delivery ? (
        <Text size="sm" color={Colors.GREY_700}>
          {delivery.pickup} → {delivery.dropoff}
        </Text>
      ) : null}
      <Text size="sm" color={Colors.GREY_700}>
        {wasMe
          ? 'head to the pickup when ready'
          : 'sit tight — another delivery will come around'}
      </Text>
    </section>
  )
}
