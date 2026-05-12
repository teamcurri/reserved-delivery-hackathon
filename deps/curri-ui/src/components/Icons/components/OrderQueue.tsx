import * as React from 'react'
import { SVGProps } from 'react'
const SvgOrderQueue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#OrderQueue_svg__a)">
      <path
        d="M10 11.679 0 6.054 10 .429l10 5.625-10 5.625Zm0 3.75-9.477-5.32L2.432 9.03 10 13.296l7.568-4.266 1.91 1.078L10 15.428Zm0 3.75-9.477-5.32 1.909-1.079L10 17.046l7.568-4.266 1.91 1.078L10 19.178Z"
        fill="#1C1B1F"
      />
    </g>
    <defs>
      <clipPath id="OrderQueue_svg__a">
        <path fill="#fff" d="M0 0h20v20H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgOrderQueue
