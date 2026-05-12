import * as React from 'react'
import { SVGProps } from 'react'
const SvgShare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#Share_svg__a)">
      <path
        d="M25.333 25.333H6.667V6.667H16V4H4v24h24V16h-2.667v9.333ZM18.667 4v2.667h4.786L10.347 19.773l1.88 1.88L25.333 8.547v4.786H28V4h-9.333Z"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="Share_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgShare
