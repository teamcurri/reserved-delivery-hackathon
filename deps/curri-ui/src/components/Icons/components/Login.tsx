import * as React from 'react'
import { SVGProps } from 'react'
const SvgLogin = (props: SVGProps<SVGSVGElement>) => (
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
      d="m8 13 1.167 1.167L13.333 10 9.167 5.833 8 7l2.167 2.167h-8.5v1.666h8.5L8 13Z"
      fill="#E8EAED"
    />
  </svg>
)
export default SvgLogin
