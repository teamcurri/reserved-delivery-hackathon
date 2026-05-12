import * as React from 'react'
import { SVGProps } from 'react'
const SvgChevronRight = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.417 9.583a.825.825 0 0 1 0-1.166L3.833 5 .417 1.583A.825.825 0 1 1 1.583.417l4 4a.825.825 0 0 1 0 1.166l-4 4a.825.825 0 0 1-1.166 0Z"
      fill="#000"
    />
  </svg>
)
export default SvgChevronRight
