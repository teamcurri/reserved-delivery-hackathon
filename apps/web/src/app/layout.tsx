import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import StyledComponentsRegistry from '@/lib/registry'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Hackathon Boilerplate',
  description: 'Desktop + mobile session sync',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        style={{
          margin: 0,
          background: '#fcfcfc',
          color: '#1c1c1c',
          fontFamily:
            "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
          fontFeatureSettings: "'cv10' 1, 'ss01' 1",
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
}
