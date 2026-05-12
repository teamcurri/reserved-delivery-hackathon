import * as React from 'react'
import { SVGProps } from 'react'
const SvgCrossX = (props: SVGProps<SVGSVGElement>) => (
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
      d="M.417.417a.825.825 0 0 1 1.166 0l10 10a.825.825 0 0 1-1.166 1.166l-10-10a.825.825 0 0 1 0-1.166Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.583.417a.825.825 0 0 1 0 1.166l-10 10a.825.825 0 0 1-1.166-1.166l10-10a.825.825 0 0 1 1.166 0Z"
      fill="#000"
    />
  </svg>
)
export default SvgCrossX
