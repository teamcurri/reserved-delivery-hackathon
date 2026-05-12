import * as React from 'react'
import { SVGProps } from 'react'
const SvgRoutePlanner = (props: SVGProps<SVGSVGElement>) => (
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
      d="M42.1 7.9H7.9C6.855 7.9 6 8.755 6 9.8v30.4c0 1.045.855 1.9 1.9 1.9h34.2c1.045 0 1.9-.855 1.9-1.9V9.8c0-1.045-.855-1.9-1.9-1.9ZM19.3 38.3H9.8V21.2h9.5v17.1Zm20.9 0h-19V21.2h19v17.1Zm0-19H9.8v-7.6h30.4v7.6Z"
      fill="#000"
    />
  </svg>
)
export default SvgRoutePlanner
