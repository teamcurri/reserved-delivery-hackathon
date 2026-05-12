import * as React from 'react'
import { SVGProps } from 'react'
const SvgInfoSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M41 8H9v32h32V8ZM24.044 19v14h2.24V19h-2.24Zm-.308-4.62v2.324h2.884V14.38h-2.884Z"
      fill="#000"
    />
  </svg>
)
export default SvgInfoSquare
