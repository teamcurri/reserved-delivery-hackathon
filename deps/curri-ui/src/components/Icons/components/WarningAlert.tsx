import * as React from 'react'
import { SVGProps } from 'react'
const SvgWarningAlert = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#Warning-Alert_svg__a)">
      <path
        d="M.768 14h14.666L8.101 1.333.768 14Zm8-2H7.434v-1.334h1.334V12Zm0-2.667H7.434V6.666h1.334v2.667Z"
        fill="#CB262B"
      />
    </g>
    <defs>
      <clipPath id="Warning-Alert_svg__a">
        <path fill="#fff" transform="translate(.1)" d="M0 0h16v16H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgWarningAlert
