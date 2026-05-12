import * as React from 'react'
import { SVGProps } from 'react'
const SvgHandle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 8 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.333 7A1.333 1.333 0 1 0 8 7a1.333 1.333 0 0 0-2.667 0ZM5.333 1.667a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.667 0ZM5.333 12.333a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.667 0ZM0 7a1.333 1.333 0 1 0 2.667 0A1.333 1.333 0 0 0 0 7ZM0 1.667a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.667 0ZM0 12.333a1.333 1.333 0 1 0 2.667 0 1.333 1.333 0 0 0-2.667 0Z"
      fill="#000"
    />
  </svg>
)
export default SvgHandle
