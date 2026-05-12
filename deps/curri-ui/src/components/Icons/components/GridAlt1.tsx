import * as React from 'react'
import { SVGProps } from 'react'
const SvgGridAlt1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="#000">
      <rect width={7} height={7} rx={0.5} />
      <rect y={10} width={7} height={7} rx={0.5} />
      <rect x={10} width={7} height={7} rx={0.5} />
      <rect x={10} y={10} width={7} height={7} rx={0.5} />
    </g>
  </svg>
)
export default SvgGridAlt1
