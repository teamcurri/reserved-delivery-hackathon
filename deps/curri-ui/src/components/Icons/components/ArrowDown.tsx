import * as React from 'react'
import { SVGProps } from 'react'
const SvgArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.19 9.78a.825.825 0 0 1 0 1.167l-2.95 2.95a.825.825 0 0 1-1.166 0l-2.95-2.95A.825.825 0 1 1 5.29 9.781l2.367 2.366 2.366-2.366a.825.825 0 0 1 1.167 0Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.657 14.139a.825.825 0 0 1-.825-.825V2a.825.825 0 1 1 1.65 0v11.314c0 .455-.37.825-.825.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgArrowDown
