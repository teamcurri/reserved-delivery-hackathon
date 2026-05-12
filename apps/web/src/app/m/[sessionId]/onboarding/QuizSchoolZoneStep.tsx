'use client'

import { useState } from 'react'
import { Button, Heading, Text, Colors } from '@curri/ui'

export function QuizSchoolZoneStep({
  onAnswer,
}: {
  onAnswer: (mph: number) => void
}) {
  const [mph, setMph] = useState(35)
  return (
    <section>
      <Heading size="h3">What speed would you drive here?</Heading>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/school_zone.png"
        alt="school zone"
        style={{
          width: '100%',
          maxHeight: 220,
          objectFit: 'contain',
          marginTop: 12,
          borderRadius: 8,
        }}
      />
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <Text size="md">
          <strong style={{ fontSize: 40 }}>{mph}</strong> mph
        </Text>
      </div>
      <input
        type="range"
        min={0}
        max={60}
        step={1}
        value={mph}
        onChange={(e) => setMph(Number(e.target.value))}
        style={{ width: '100%', marginTop: 8 }}
      />
      <Text size="sm" color={Colors.GREY_700}>
        slide to your honest answer
      </Text>
      <div style={{ marginTop: 16 }}>
        <Button color="teal" isFullWidth onClick={() => onAnswer(mph)}>
          Confirm
        </Button>
      </div>
    </section>
  )
}
