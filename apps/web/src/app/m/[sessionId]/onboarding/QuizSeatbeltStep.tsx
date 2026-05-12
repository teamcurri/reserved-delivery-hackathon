'use client'

import { Button, Heading, Text, Colors } from '@curri/ui'

export function QuizSeatbeltStep({
  onAnswer,
}: {
  onAnswer: (yes: boolean) => void
}) {
  return (
    <section>
      <div style={{ fontSize: 96, lineHeight: 1, textAlign: 'center' }}>🪢</div>
      <Heading size="h3">Do you wear a seatbelt?</Heading>
      <Text size="sm" color={Colors.GREY_700}>
        be honest
      </Text>
      <div style={{ marginTop: 16, display: 'flex', gap: 12 }}>
        <Button color="teal" isFullWidth onClick={() => onAnswer(true)}>
          Yes
        </Button>
        <Button color="red" variant="outlined" isFullWidth onClick={() => onAnswer(false)}>
          No
        </Button>
      </div>
    </section>
  )
}
