import * as React from 'react'
import { SVGProps } from 'react'
const SvgInfo = (props: SVGProps<SVGSVGElement>) => (
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
    <rect x={8} y={4} width={2} height={2} rx={1} fill="#000" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 7a1 1 0 0 1 1 1v5a1 1 0 1 1-2 0V8a1 1 0 0 1 1-1Z"
      fill="#000"
    />
  </svg>
)
export default SvgInfo
