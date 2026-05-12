import * as React from 'react'
import { SVGProps } from 'react'
const SvgPlus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.249 6a.6.6 0 0 1 .6-.6H11.15a.6.6 0 1 1 0 1.2H.85A.6.6 0 0 1 .249 6Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 .249a.6.6 0 0 1 .6.6V11.15a.6.6 0 1 1-1.2 0V.85A.6.6 0 0 1 6 .249Z"
      fill="#000"
    />
  </svg>
)
export default SvgPlus
