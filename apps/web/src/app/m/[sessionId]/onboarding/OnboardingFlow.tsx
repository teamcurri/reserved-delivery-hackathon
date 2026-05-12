'use client'

import { useCallback, useState } from 'react'
import {
  type DispatchEvent,
  type DriverBlend,
  type LatLng,
  type OnboardingStep,
  type QuizAnswers,
  rollSanDiegoLocation,
  scoreQuiz,
  scoreReaction,
} from '@hackathon/shared'
import { QuizBoxStep } from './QuizBoxStep'
import { QuizSeatbeltStep } from './QuizSeatbeltStep'
import { QuizSchoolZoneStep } from './QuizSchoolZoneStep'
import { QuizMomStep } from './QuizMomStep'
import { ReactionStep } from './ReactionStep'

export type OnboardingResult = {
  blend: DriverBlend
  location: LatLng
  reactionMs: number
  quizAnswers: Required<QuizAnswers>
}

const STEP_ORDER: OnboardingStep[] = [
  'quiz:box',
  'quiz:seatbelt',
  'quiz:school-zone',
  'quiz:mom',
  'reaction',
]

/**
 * Orchestrates the quiz + reaction sequence. Each transition emits a
 * `driver:onboarding` snapshot so the desktop sees per-step progress live.
 * The final `driver:setBlend` is emitted by the parent (the mobile page),
 * not here — keeps this component focused on local UI state.
 */
export function OnboardingFlow({
  dispatch,
  onComplete,
}: {
  dispatch: (e: DispatchEvent) => void
  onComplete: (result: OnboardingResult) => void
}) {
  const [stepIndex, setStepIndex] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({})

  const advance = useCallback(
    (nextAnswers: QuizAnswers, nextStepIndex: number) => {
      const nextStep =
        nextStepIndex >= STEP_ORDER.length ? 'done' : STEP_ORDER[nextStepIndex]
      dispatch({
        type: 'driver:onboarding',
        payload: { step: nextStep, answers: nextAnswers },
      })
      if (nextStep === 'done') {
        const fullAnswers = nextAnswers as Required<QuizAnswers>
        const blend: DriverBlend = {
          quality: scoreQuiz(fullAnswers),
          accept: scoreReaction(fullAnswers.reactionMs),
        }
        const location = rollSanDiegoLocation()
        onComplete({
          blend,
          location,
          reactionMs: fullAnswers.reactionMs,
          quizAnswers: fullAnswers,
        })
        return
      }
      setAnswers(nextAnswers)
      setStepIndex(nextStepIndex)
    },
    [dispatch, onComplete],
  )

  const step = STEP_ORDER[stepIndex]

  return (
    <section style={{ marginTop: 16 }}>
      <StepProgress current={stepIndex} total={STEP_ORDER.length} />
      {step === 'quiz:box' ? (
        <QuizBoxStep
          onAnswer={(box) => advance({ ...answers, box }, stepIndex + 1)}
        />
      ) : null}
      {step === 'quiz:seatbelt' ? (
        <QuizSeatbeltStep
          onAnswer={(seatbelt) => advance({ ...answers, seatbelt }, stepIndex + 1)}
        />
      ) : null}
      {step === 'quiz:school-zone' ? (
        <QuizSchoolZoneStep
          onAnswer={(schoolZoneMph) =>
            advance({ ...answers, schoolZoneMph }, stepIndex + 1)
          }
        />
      ) : null}
      {step === 'quiz:mom' ? (
        <QuizMomStep
          onAnswer={(mom) => advance({ ...answers, mom }, stepIndex + 1)}
        />
      ) : null}
      {step === 'reaction' ? (
        <ReactionStep
          onComplete={(reactionMs) =>
            advance({ ...answers, reactionMs }, stepIndex + 1)
          }
        />
      ) : null}
    </section>
  )
}

function StepProgress({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            height: 4,
            borderRadius: 2,
            background: i <= current ? '#1f8a70' : '#e0e0e0',
          }}
        />
      ))}
    </div>
  )
}
