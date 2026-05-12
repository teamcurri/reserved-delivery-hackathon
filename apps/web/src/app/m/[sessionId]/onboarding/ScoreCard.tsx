'use client'

import { Colors, Heading, Text } from '@curri/ui'
import {
  type DriverBlend,
  type LatLng,
  approxMiles,
  quizStars,
} from '@hackathon/shared'

export function ScoreCard({
  blend,
  location,
  onReset,
}: {
  blend: DriverBlend
  location: LatLng
  onReset?: () => void
}) {
  const stars = quizStars(blend.quality)
  const miles = approxMiles(location)
  return (
    <section
      style={{
        marginTop: 16,
        padding: 16,
        background: Colors.GREY_100,
        borderRadius: 12,
      }}
    >
      <Heading size="h3">Your score</Heading>
      <div style={{ fontSize: 36, letterSpacing: 4, lineHeight: 1 }}>
        <span style={{ color: Colors.YELLOW_500 }}>{'★'.repeat(stars)}</span>
        <span style={{ color: Colors.GREY_400 }}>{'☆'.repeat(5 - stars)}</span>
      </div>
      <Text size="sm" color={Colors.GREY_700}>
        quality {blend.quality.toFixed(2)} · accept {blend.accept.toFixed(2)} · {miles} mi from downtown SD
      </Text>
      {onReset ? (
        <div style={{ marginTop: 8 }}>
          <button
            type="button"
            onClick={onReset}
            style={{
              all: 'unset',
              cursor: 'pointer',
              color: Colors.GREY_700,
              fontSize: 12,
              textDecoration: 'underline',
            }}
          >
            reset profile
          </button>
        </div>
      ) : null}
    </section>
  )
}
