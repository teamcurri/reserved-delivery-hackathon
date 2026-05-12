import * as React from 'react'
import { SVGProps } from 'react'
const SvgLogout = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.667 4.167H10V2.5h6.667c.916 0 1.666.75 1.666 1.667v11.666c0 .917-.75 1.667-1.666 1.667H10v-1.667h6.667V4.167Z"
      fill="#E8EAED"
    />
    <path
      d="M7 7 5.833 5.833 1.667 10l4.166 4.167L7 13l-2.167-2.167h8.5V9.167h-8.5L7 7Z"
      fill="#E8EAED"
    />
  </svg>
)
export default SvgLogout
