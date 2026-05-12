import * as React from 'react'
import { SVGProps } from 'react'
const SvgCrosshairs = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.175 9.027c0-3.78 3.036-6.852 6.825-6.852s6.825 3.072 6.825 6.852c0 3.789-3.046 6.798-6.825 6.798-3.78 0-6.825-3.01-6.825-6.798ZM9 3.825c-2.868 0-5.175 2.324-5.175 5.202 0 2.868 2.297 5.148 5.175 5.148 2.878 0 5.175-2.28 5.175-5.148 0-2.878-2.307-5.202-5.175-5.202Z"
      fill="#000"
    />
    <path d="M9 12.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" fill="#000" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.175 9c0-.456.37-.825.825-.825h2a.825.825 0 0 1 0 1.65H1A.825.825 0 0 1 .175 9ZM14.175 9c0-.456.37-.825.825-.825h2a.825.825 0 0 1 0 1.65h-2A.825.825 0 0 1 14.175 9ZM9 .175c.456 0 .825.37.825.825v2a.825.825 0 1 1-1.65 0V1c0-.456.37-.825.825-.825ZM9 14.175c.456 0 .825.37.825.825v2a.825.825 0 0 1-1.65 0v-2c0-.456.37-.825.825-.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgCrosshairs
