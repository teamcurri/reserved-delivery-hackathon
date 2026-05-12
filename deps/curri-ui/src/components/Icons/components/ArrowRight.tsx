import * as React from 'react'
import { SVGProps } from 'react'
const SvgArrowRight = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.78 4.124a.825.825 0 0 1 1.167 0l2.95 2.95a.825.825 0 0 1 0 1.166l-2.95 2.95a.825.825 0 1 1-1.166-1.167l2.366-2.366L9.781 5.29a.825.825 0 0 1 0-1.166Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M14.139 7.657c0 .456-.37.825-.825.825H2a.825.825 0 1 1 0-1.65h11.314c.455 0 .825.37.825.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgArrowRight
