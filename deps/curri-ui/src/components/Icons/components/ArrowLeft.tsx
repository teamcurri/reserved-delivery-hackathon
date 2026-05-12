import * as React from 'react'
import { SVGProps } from 'react'
const SvgArrowLeft = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5.533 11.19a.825.825 0 0 1-1.167 0l-2.95-2.95a.825.825 0 0 1 0-1.167l2.95-2.95A.825.825 0 1 1 5.533 5.29L3.167 7.657l2.366 2.366a.825.825 0 0 1 0 1.167Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.175 7.657c0-.456.37-.825.825-.825h11.314a.825.825 0 0 1 0 1.65H2a.825.825 0 0 1-.825-.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgArrowLeft
