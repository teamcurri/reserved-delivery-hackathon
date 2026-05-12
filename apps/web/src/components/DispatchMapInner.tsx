'use client'

import { useEffect, useMemo, useRef } from 'react'
import L from 'leaflet'
import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  Tooltip,
  useMap,
} from 'react-leaflet'
import type { ClientInfo, SessionState } from '@hackathon/shared'
import 'leaflet/dist/leaflet.css'
import { SAN_DIEGO_CENTER, findCoordsByAddress } from '@/lib/routes'

const CENTER: [number, number] = SAN_DIEGO_CENTER
const RADIUS_DEG = 0.06

const containerStyle = {
  width: '100%',
  height: 320,
  borderRadius: 12,
  overflow: 'hidden',
} as const

function hashId(id: string): { a: number; b: number } {
  let h = 2166136261
  for (let i = 0; i < id.length; i++) {
    h ^= id.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const a = ((h >>> 0) % 10000) / 10000
  const b = (((h * 31) >>> 0) % 10000) / 10000
  return { a, b }
}

function useMockCoords() {
  const cacheRef = useRef(new Map<string, [number, number]>())
  return (id: string): [number, number] => {
    const hit = cacheRef.current.get(id)
    if (hit) return hit
    const { a, b } = hashId(id)
    const coord: [number, number] = [
      CENTER[0] + (a - 0.5) * 2 * RADIUS_DEG,
      CENTER[1] + (b - 0.5) * 2 * RADIUS_DEG,
    ]
    cacheRef.current.set(id, coord)
    return coord
  }
}

function circleIcon({
  color,
  text,
  size,
  opacity = 1,
}: {
  color: string
  text: string
  size: number
  opacity?: number
}): L.DivIcon {
  const html = `<div style="
    width:${size}px;height:${size}px;border-radius:50%;
    background:${color};color:#fff;border:2px solid #fff;
    box-shadow:0 1px 3px rgba(0,0,0,0.35);
    display:flex;align-items:center;justify-content:center;
    font:700 12px/1 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    opacity:${opacity};
  ">${text}</div>`
  return L.divIcon({
    html,
    className: '',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  })
}

function FitToMarkers({ points }: { points: Array<[number, number]> }) {
  const map = useMap()
  useEffect(() => {
    const [first, ...rest] = points
    if (!first) return
    if (rest.length === 0) {
      map.setView(first, 13, { animate: true })
      return
    }
    const bounds = L.latLngBounds(points.map((p) => L.latLng(p[0], p[1])))
    map.fitBounds(bounds, { padding: [32, 32], maxZoom: 14 })
  }, [map, JSON.stringify(points)])
  return null
}

export type DispatchMapInnerProps = {
  state: SessionState | undefined
  mobiles: ClientInfo[]
  compose?: { pickup: string; dropoff: string }
}

export function DispatchMapInner({
  state,
  mobiles,
  compose,
}: DispatchMapInnerProps) {
  const mockCoord = useMockCoords()

  const activeIds = useMemo(
    () =>
      new Set(
        (state?.blasts ?? []).filter((b) => b.outcome === 'pending').map((b) => b.driverId),
      ),
    [state?.blasts],
  )

  const driverMarkers = mobiles.map((c) => {
    const pos = mockCoord(`driver:${c.clientId}`)
    const isActive = activeIds.has(c.clientId)
    return {
      key: c.clientId,
      pos,
      name: c.identity?.name ?? '(no name)',
      letter: c.identity?.name?.[0]?.toUpperCase() ?? 'D',
      isActive,
    }
  })

  // Prefer real coords from the hardcoded route fixtures. Falls back to a
  // deterministic mock hash for any unknown address (e.g. webhook-injected
  // deliveries that didn't come from the route picker).
  const pickupAddr = (state?.delivery?.pickup ?? compose?.pickup ?? '').trim()
  const dropoffAddr = (state?.delivery?.dropoff ?? compose?.dropoff ?? '').trim()
  const isPreview = !state?.delivery
  const pickup = pickupAddr
    ? findCoordsByAddress(pickupAddr) ?? mockCoord(`pickup:${pickupAddr}`)
    : null
  const dropoff = dropoffAddr
    ? findCoordsByAddress(dropoffAddr) ?? mockCoord(`dropoff:${dropoffAddr}`)
    : null

  const allPoints: Array<[number, number]> = [
    ...driverMarkers.map((d) => d.pos),
    ...(pickup ? [pickup] : []),
    ...(dropoff ? [dropoff] : []),
  ]

  return (
    <MapContainer
      center={CENTER}
      zoom={12}
      style={containerStyle}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitToMarkers points={allPoints} />

      {driverMarkers.map((d) => (
        <Marker
          key={d.key}
          position={d.pos}
          icon={circleIcon({
            color: d.isActive ? '#f59e0b' : '#0ea5e9',
            text: d.letter,
            size: d.isActive ? 30 : 22,
          })}
          zIndexOffset={d.isActive ? 1000 : 0}
        >
          <Tooltip direction="top" offset={[0, -12]}>
            {d.name}
            {d.isActive ? ' · blasting' : ''}
          </Tooltip>
        </Marker>
      ))}

      {pickup && dropoff ? (
        <Polyline
          positions={[pickup, dropoff]}
          pathOptions={{
            color: '#0ea5e9',
            weight: 3,
            opacity: isPreview ? 0.55 : 0.9,
            dashArray: isPreview ? '6 8' : undefined,
          }}
        />
      ) : null}

      {pickup ? (
        <Marker
          position={pickup}
          icon={circleIcon({
            color: '#10b981',
            text: 'P',
            size: 26,
            opacity: isPreview ? 0.7 : 1,
          })}
          zIndexOffset={2000}
        >
          <Tooltip direction="top" offset={[0, -14]}>
            {isPreview ? 'pickup (preview)' : 'pickup'}
          </Tooltip>
        </Marker>
      ) : null}

      {dropoff ? (
        <Marker
          position={dropoff}
          icon={circleIcon({
            color: '#ef4444',
            text: 'D',
            size: 26,
            opacity: isPreview ? 0.7 : 1,
          })}
          zIndexOffset={2000}
        >
          <Tooltip direction="top" offset={[0, -14]}>
            {isPreview ? 'dropoff (preview)' : 'dropoff'}
          </Tooltip>
        </Marker>
      ) : null}
    </MapContainer>
  )
}
