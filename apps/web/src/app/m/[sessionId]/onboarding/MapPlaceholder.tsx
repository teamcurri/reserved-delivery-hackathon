'use client'

import { Colors, Text } from '@curri/ui'
import { type LatLng, projectToBox } from '@hackathon/shared'

const WIDTH = 320
const HEIGHT = 220

export function MapPlaceholder({ location }: { location: LatLng }) {
  const { x, y } = projectToBox(location, WIDTH, HEIGHT)
  return (
    <section style={{ marginTop: 16 }}>
      <Text size="sm" color={Colors.GREY_700}>
        San Diego (map placeholder)
      </Text>
      <svg
        width="100%"
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        style={{
          marginTop: 4,
          background: Colors.GREY_100,
          border: `1px dashed ${Colors.GREY_400}`,
          borderRadius: 8,
        }}
      >
        {/* Faint crosshair through center for SD reference */}
        <line
          x1={WIDTH / 2}
          y1={0}
          x2={WIDTH / 2}
          y2={HEIGHT}
          stroke={Colors.GREY_200}
          strokeDasharray="2 4"
        />
        <line
          x1={0}
          y1={HEIGHT / 2}
          x2={WIDTH}
          y2={HEIGHT / 2}
          stroke={Colors.GREY_200}
          strokeDasharray="2 4"
        />
        {/* Driver pin */}
        <circle cx={x} cy={y} r={9} fill={Colors.TEAL_500} stroke="white" strokeWidth={2} />
        <text
          x={x}
          y={y - 14}
          textAnchor="middle"
          fontSize={11}
          fill={Colors.GREY_700}
        >
          you
        </text>
      </svg>
    </section>
  )
}
