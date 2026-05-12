import * as React from 'react'
import { SVGProps } from 'react'
const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 10 6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.583 5.583a.825.825 0 0 1-1.166 0L5 2.167 1.583 5.583A.825.825 0 1 1 .417 4.417l4-4a.825.825 0 0 1 1.166 0l4 4a.825.825 0 0 1 0 1.166Z"
      fill="#000"
    />
  </svg>
)
export default SvgChevronUp
