import * as React from 'react'
import { SVGProps } from 'react'
const SvgClock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      d="M13.987.667C6.627.667.667 6.64.667 14s5.96 13.333 13.32 13.333c7.373 0 13.346-5.973 13.346-13.333S21.36.667 13.987.667Zm.013 24C8.107 24.667 3.333 19.893 3.333 14S8.107 3.333 14 3.333 24.667 8.107 24.667 14 19.893 24.667 14 24.667Zm-.293-17.334h-.08a.956.956 0 0 0-.96.96v6.294c0 .466.24.906.653 1.146l5.533 3.32c.454.267 1.04.134 1.307-.32a.947.947 0 0 0-.333-1.32l-5.16-3.066V8.293a.956.956 0 0 0-.96-.96Z"
      fill="#000"
    />
  </svg>
)
export default SvgClock
