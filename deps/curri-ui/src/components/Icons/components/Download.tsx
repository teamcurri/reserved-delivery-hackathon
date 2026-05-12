import * as React from 'react'
import { SVGProps } from 'react'
const SvgDownload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#download_svg__a)">
      <path d="M25.333 12H20V4h-8v8H6.667L16 21.333 25.333 12ZM6.667 24v2.667h18.666V24H6.667Z" />
    </g>
    <defs>
      <clipPath id="download_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgDownload
