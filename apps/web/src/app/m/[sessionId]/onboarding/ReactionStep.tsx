'use client'

import { useEffect, useRef, useState } from 'react'
import { Colors, Heading, Text } from '@curri/ui'

type Phase = 'waiting' | 'armed' | 'too-eager' | 'done'

const MIN_DELAY_MS = 2000
const MAX_DELAY_MS = 4000
const NO_TAP_TIMEOUT_MS = 3000
const FLOOR_RESULT_MS = 1500

export function ReactionStep({
  onComplete,
}: {
  onComplete: (ms: number) => void
}) {
  const [phase, setPhase] = useState<Phase>('waiting')
  const [falseStarts, setFalseStarts] = useState(0)
  const armTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const noTapTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const flashAt = useRef(0)

  const clearTimers = () => {
    if (armTimer.current) clearTimeout(armTimer.current)
    if (noTapTimer.current) clearTimeout(noTapTimer.current)
    armTimer.current = null
    noTapTimer.current = null
  }

  const scheduleArm = () => {
    clearTimers()
    const delay = MIN_DELAY_MS + Math.random() * (MAX_DELAY_MS - MIN_DELAY_MS)
    armTimer.current = setTimeout(() => {
      flashAt.current = performance.now()
      setPhase('armed')
      noTapTimer.current = setTimeout(() => {
        setPhase('done')
        onComplete(FLOOR_RESULT_MS)
      }, NO_TAP_TIMEOUT_MS)
    }, delay)
  }

  useEffect(() => {
    scheduleArm()
    return clearTimers
    // run once on mount; resets happen via explicit re-arms in handlers
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTap = () => {
    if (phase === 'done') return
    if (phase === 'armed') {
      clearTimers()
      const ms = Math.round(performance.now() - flashAt.current)
      setPhase('done')
      onComplete(ms)
      return
    }
    // 'waiting' or 'too-eager' → false start
    clearTimers()
    if (falseStarts >= 1) {
      // Second false start commits the floor result.
      setPhase('done')
      onComplete(FLOOR_RESULT_MS)
      return
    }
    setFalseStarts((n) => n + 1)
    setPhase('too-eager')
    // Re-arm after a brief settle window.
    armTimer.current = setTimeout(() => scheduleArm(), 800)
  }

  const isFlash = phase === 'armed'

  return (
    <section>
      <Heading size="h3">Reaction test</Heading>
      <Text size="sm" color={Colors.GREY_700}>
        wait for the screen to flash white, then tap as fast as you can
      </Text>
      <div
        role="button"
        tabIndex={0}
        onClick={handleTap}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault()
            handleTap()
          }
        }}
        style={{
          marginTop: 16,
          height: 320,
          borderRadius: 16,
          background: isFlash ? 'white' : Colors.GREY_700,
          color: isFlash ? Colors.GREY_700 : 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 24,
          cursor: 'pointer',
          userSelect: 'none',
          transition: 'background 60ms linear',
          border: isFlash ? `4px solid ${Colors.YELLOW_500}` : 'none',
        }}
      >
        {phase === 'waiting' && 'Wait for it…'}
        {phase === 'too-eager' && 'Too eager — try again'}
        {phase === 'armed' && 'TAP!'}
        {phase === 'done' && '✓'}
      </div>
    </section>
  )
}
