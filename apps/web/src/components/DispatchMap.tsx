'use client'

import dynamic from 'next/dynamic'
import type { DispatchMapInnerProps } from './DispatchMapInner'

/**
 * Leaflet touches `window` at import time, so we lazy-load the actual map
 * implementation client-side only. The Next.js App Router still evaluates
 * 'use client' modules on the server during the initial render; dynamic with
 * ssr:false fully skips that.
 */
export const DispatchMap = dynamic<DispatchMapInnerProps>(
  () => import('./DispatchMapInner').then((m) => m.DispatchMapInner),
  { ssr: false, loading: () => <MapSkeleton /> },
)

function MapSkeleton() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        minHeight: 320,
        background: '#f3f4f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280',
        fontSize: 13,
      }}
    >
      loading map…
    </div>
  )
}
