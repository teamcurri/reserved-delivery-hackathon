import * as React from 'react'
import { SVGProps } from 'react'
const SvgList = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fill="#000"
      d="M4.625 10.25h6.958v5.567H4.625zM4.625 21.383h6.958v5.567H4.625zM4.625 32.517h6.958v5.567H4.625zM16.802 10.25h29.573v5.567H16.802zM16.802 21.383h29.573v5.567H16.802zM16.802 32.517h29.573v5.567H16.802z"
    />
  </svg>
)
export default SvgList
