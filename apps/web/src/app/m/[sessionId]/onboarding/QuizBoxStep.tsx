'use client'

import { Colors, Heading, Text } from '@curri/ui'

export function QuizBoxStep({
  onAnswer,
}: {
  onAnswer: (choice: 'box' | 'fox') => void
}) {
  return (
    <section>
      <Heading size="h3">Which one is the box?</Heading>
      <Text size="sm" color={Colors.GREY_700}>
        tap to pick
      </Text>
      <div
        style={{
          marginTop: 16,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}
      >
        <ImageChoice src="/box.png" label="A" onClick={() => onAnswer('box')} />
        <ImageChoice src="/fox.png" label="B" onClick={() => onAnswer('fox')} />
      </div>
    </section>
  )
}

function ImageChoice({
  src,
  label,
  onClick,
}: {
  src: string
  label: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        all: 'unset',
        cursor: 'pointer',
        border: `2px solid ${Colors.GREY_200}`,
        borderRadius: 12,
        padding: 12,
        background: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={label}
        style={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'contain' }}
      />
      <Text size="md">{label}</Text>
    </button>
  )
}
