'use client'

import { use } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Heading, Text, Colors } from '@curri/ui'
import { useSession } from '@/lib/useSession'
import { DispatchMap } from '@/components/DispatchMap'
import { DriverPanel } from '@/components/DriverPanel'
import { WEB_URL } from '@/lib/env'

type PageProps = { params: Promise<{ sessionId: string }> }

export default function QRPage({ params }: PageProps) {
  const { sessionId } = use(params)
  const mobileUrl = `${WEB_URL}/m/${sessionId}`

  // Read-only presentation view: 'spectator' role joins the session room and
  // receives state pushes but doesn't take the (singleton) parent slot, so
  // the dispatch console can stay open in another tab.
  const { state, clients } = useSession(sessionId, 'spectator', undefined, true)

  const mobiles = clients.filter((c) => c.role === 'mobile')
  // Only show drivers on the global map once they've completed onboarding;
  // mid-quiz drivers would otherwise all stack on SD_CENTER and be visually
  // noisy. The table below still shows everyone with their current step.
  const onboardedMobiles = mobiles.filter(
    (c) => state?.drivers[c.clientId]?.onboarding?.step === 'done',
  )

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: 32,
        background: Colors.GREY_100,
      }}
    >
      <section
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'center',
          background: '#fff',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <QRCodeCanvas value={mobileUrl} size={240} marginSize={2} />
        <div>
          <Heading size="h1">Scan to join</Heading>
          <Text size="md" color={Colors.GREY_700}>
            drivers, point your phone camera here
          </Text>
          <Text size="md" style={{ marginTop: 12 }}>
            <a href={mobileUrl}>{mobileUrl}</a>
          </Text>
          <Text size="sm" color={Colors.GREY_700}>
            session <code>{sessionId}</code> · {onboardedMobiles.length}{' '}
            onboarded · {mobiles.length} total
          </Text>
        </div>
      </section>

      <section style={{ marginTop: 24 }}>
        <DispatchMap state={state} mobiles={onboardedMobiles} height={520} />
      </section>

      <section style={{ marginTop: 16 }}>
        <DriverPanel state={state} mobiles={mobiles} />
      </section>
    </main>
  )
}
