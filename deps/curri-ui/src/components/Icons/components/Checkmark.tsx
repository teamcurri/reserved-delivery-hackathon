import * as React from 'react'
import { SVGProps } from 'react'
const SvgCheckmark = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 13 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12.612.418a.825.825 0 0 1-.002 1.166l-8.028 8a.825.825 0 0 1-1.165 0l-3-3a.825.825 0 0 1 1.166-1.167l2.418 2.417L11.446.416a.825.825 0 0 1 1.166.002Z"
      fill="#000"
    />
  </svg>
)
export default SvgCheckmark
