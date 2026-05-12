import * as React from 'react'
import { SVGProps } from 'react'
const SvgPlusSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M40.75 9.25H9.25v31.5h31.5V9.25Zm-7 17.5h-7v7h-3.5v-7h-7v-3.5h7v-7h3.5v7h7v3.5Z"
      fill="#000"
    />
  </svg>
)
export default SvgPlusSquare
