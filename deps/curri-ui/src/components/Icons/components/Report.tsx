import * as React from 'react'
import { SVGProps } from 'react'
const SvgReport = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M33.455 5H8v29.09h3.636V8.637h21.819V5Zm-1.819 7.273 10.91 10.909V45H15.272V12.273h16.363ZM29.818 25h10l-10-10v10Z"
      fill="#000"
    />
  </svg>
)
export default SvgReport
