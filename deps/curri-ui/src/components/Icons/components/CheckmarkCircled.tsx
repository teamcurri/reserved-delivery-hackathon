import * as React from 'react'
import { SVGProps } from 'react'
const SvgCheckmarkCircled = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9 1.825a7.175 7.175 0 1 0 0 14.35 7.175 7.175 0 0 0 0-14.35ZM.175 9a8.825 8.825 0 1 1 17.65 0A8.825 8.825 0 0 1 .175 9Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.583 6.417a.825.825 0 0 1 0 1.166l-5 5a.825.825 0 0 1-1.166 0l-2-2a.825.825 0 0 1 1.166-1.166L8 10.833l4.417-4.416a.825.825 0 0 1 1.166 0Z"
      fill="#000"
    />
  </svg>
)
export default SvgCheckmarkCircled
