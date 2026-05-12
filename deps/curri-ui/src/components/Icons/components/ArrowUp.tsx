import * as React from 'react'
import { SVGProps } from 'react'
const SvgArrowUp = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4.124 5.533a.825.825 0 0 1 0-1.167l2.95-2.95a.825.825 0 0 1 1.166 0l2.95 2.95a.825.825 0 0 1-1.167 1.167L7.657 3.167 5.29 5.533a.825.825 0 0 1-1.166 0Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.657 1.175c.456 0 .825.37.825.825v11.314a.825.825 0 0 1-1.65 0V2c0-.456.37-.825.825-.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgArrowUp
