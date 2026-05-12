import * as React from 'react'
import { SVGProps } from 'react'
const SvgTruck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M16.667 6.667h-2.5V3.333H2.5C1.583 3.333.833 4.083.833 5v9.167H2.5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5h5c0 1.383 1.117 2.5 2.5 2.5s2.5-1.117 2.5-2.5h1.667V10l-2.5-3.333ZM5 15.417c-.692 0-1.25-.559-1.25-1.25 0-.692.558-1.25 1.25-1.25s1.25.558 1.25 1.25c0 .691-.558 1.25-1.25 1.25Zm11.25-7.5L17.883 10h-3.716V7.917h2.083Zm-1.25 7.5c-.692 0-1.25-.559-1.25-1.25 0-.692.558-1.25 1.25-1.25s1.25.558 1.25 1.25c0 .691-.558 1.25-1.25 1.25Z"
      fill="#7E8085"
    />
  </svg>
)
export default SvgTruck
