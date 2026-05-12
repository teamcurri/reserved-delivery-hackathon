'use client'

import { Button, Colors, Text } from '@curri/ui'
import { quizStars } from '@hackathon/shared'
import type { SavedProfile } from './profileStorage'

export function RestorePrompt({
  profile,
  onRestore,
  onStartOver,
}: {
  profile: SavedProfile
  onRestore: () => void
  onStartOver: () => void
}) {
  const stars = quizStars(profile.blend.quality)
  return (
    <section
      style={{
        padding: 16,
        marginBottom: 16,
        background: Colors.YELLOW_100,
        borderRadius: 12,
      }}
    >
      <Text size="md">
        Welcome back, <strong>{profile.name}</strong>.
      </Text>
      <Text size="sm" color={Colors.GREY_700}>
        last score · {'★'.repeat(stars)}
        {'☆'.repeat(5 - stars)} · accept {profile.blend.accept.toFixed(2)}
      </Text>
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <Button color="teal" onClick={onRestore}>
          Restore profile
        </Button>
        <Button variant="outlined" onClick={onStartOver}>
          Start over
        </Button>
      </div>
    </section>
  )
}
