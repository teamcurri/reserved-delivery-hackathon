import * as React from 'react'
import { SVGProps } from 'react'
const SvgBarChart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 14 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g fill="#000">
      <path d="M0 4v12h2V4zM6 0v16h2V0zM12 7v9h2V7z" />
    </g>
  </svg>
)
export default SvgBarChart
