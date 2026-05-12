/**
 * Demo-only fixture: 4 pre-baked San Diego routes the desktop user can pick
 * from. Coordinates are real (good enough for visual demos) so the map can
 * show pickup/dropoff in true locations rather than hashed mock points.
 *
 * Each route also carries `details` — the cargo metadata that ends up on the
 * dispatched `Delivery` (price, weight, PPE, etc.). The driver-side dispatch
 * view renders these. Replace later with a real order entry form.
 */

import type { DeliveryDetails } from '@hackathon/shared'

export type RoutePoint = {
  address: string
  lat: number
  lng: number
}

export type RouteSpec = {
  id: string
  label: string
  pickup: RoutePoint
  dropoff: RoutePoint
  details: DeliveryDetails
}

export const SAN_DIEGO_CENTER: [number, number] = [32.7383, -117.1751]

export const ROUTES = [
  {
    id: 'gaslamp-balboa',
    label: 'Gaslamp → Balboa Park',
    pickup: { address: '500 5th Ave, San Diego, CA', lat: 32.7124, lng: -117.1593 },
    dropoff: { address: '1549 El Prado, San Diego, CA', lat: 32.7314, lng: -117.1495 },
    details: {
      price: 18.5,
      totalDistanceMi: 2.4,
      ppe: [],
      totalItems: 3,
      totalWeightLbs: 12,
      description: 'Party balloons and gift bags for a Balboa Park photo shoot.',
    },
  },
  {
    id: 'little-italy-liberty-station',
    label: 'Little Italy → Liberty Station',
    pickup: { address: '1660 India St, San Diego, CA', lat: 32.7257, lng: -117.1689 },
    dropoff: { address: '2640 Historic Decatur Rd, San Diego, CA', lat: 32.74, lng: -117.209 },
    details: {
      price: 34.0,
      totalDistanceMi: 4.8,
      ppe: ['Gloves'],
      totalItems: 8,
      totalWeightLbs: 25,
      description: 'Hot catering trays for a corporate lunch. Keep upright.',
    },
  },
  {
    id: 'la-jolla-ucsd',
    label: 'La Jolla Cove → UCSD',
    pickup: { address: '1100 Coast Blvd, La Jolla, CA', lat: 32.8503, lng: -117.2715 },
    dropoff: { address: '9500 Gilman Dr, La Jolla, CA', lat: 32.8801, lng: -117.234 },
    details: {
      price: 52.0,
      totalDistanceMi: 6.3,
      ppe: ['Gloves', 'Safety vest'],
      totalItems: 1,
      totalWeightLbs: 5,
      description: 'Engineering prototype — fragile, signature required at handoff.',
    },
  },
  {
    id: 'north-park-hillcrest',
    label: 'North Park → Hillcrest',
    pickup: { address: '3030 University Ave, San Diego, CA', lat: 32.7489, lng: -117.1294 },
    dropoff: { address: '1500 University Ave, San Diego, CA', lat: 32.7479, lng: -117.1463 },
    details: {
      price: 11.75,
      totalDistanceMi: 1.1,
      ppe: [],
      totalItems: 2,
      totalWeightLbs: 3,
      description: 'Sealed legal documents — recipient must show ID.',
    },
  },
] as const satisfies readonly RouteSpec[]

export const DEFAULT_ROUTE: RouteSpec = ROUTES[0]
export const DEFAULT_ROUTE_ID: string = DEFAULT_ROUTE.id

export function getRoute(id: string): RouteSpec | undefined {
  return ROUTES.find((r) => r.id === id)
}

/**
 * Reverse lookup: given an address string (as stored on a Delivery), return
 * its real coordinates if it belongs to a known route. Used by the map to
 * render real positions for dispatched deliveries.
 */
export function findCoordsByAddress(address: string): [number, number] | null {
  const a = address.trim()
  for (const r of ROUTES) {
    if (r.pickup.address === a) return [r.pickup.lat, r.pickup.lng]
    if (r.dropoff.address === a) return [r.dropoff.lat, r.dropoff.lng]
  }
  return null
}
