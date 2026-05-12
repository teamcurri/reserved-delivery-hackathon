import * as React from 'react'
import { SVGProps } from 'react'
const SvgChevronDown = (props: SVGProps<SVGSVGElement>) => (
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
      d="M.417.417a.825.825 0 0 1 1.166 0L5 3.833 8.417.417a.825.825 0 1 1 1.166 1.166l-4 4a.825.825 0 0 1-1.166 0l-4-4a.825.825 0 0 1 0-1.166Z"
      fill="#000"
    />
  </svg>
)
export default SvgChevronDown
