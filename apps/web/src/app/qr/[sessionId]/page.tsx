'use client'

import { use } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Heading, Text, Colors } from '@curri/ui'
import { WEB_URL } from '@/lib/env'

type PageProps = { params: Promise<{ sessionId: string }> }

export default function QRPage({ params }: PageProps) {
  const { sessionId } = use(params)
  const mobileUrl = `${WEB_URL}/m/${sessionId}`

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 32,
        gap: 24,
        background: Colors.GREY_100,
      }}
    >
      <Heading size="h1">Scan to join</Heading>
      <Text size="md" color={Colors.GREY_700}>
        drivers, point your phone camera here
      </Text>

      <div
        style={{
          background: '#fff',
          padding: 24,
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <QRCodeCanvas value={mobileUrl} size={384} marginSize={2} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <Text size="md">
          <a href={mobileUrl}>{mobileUrl}</a>
        </Text>
        <Text size="sm" color={Colors.GREY_700}>
          session <code>{sessionId}</code>
        </Text>
      </div>
    </main>
  )
}
