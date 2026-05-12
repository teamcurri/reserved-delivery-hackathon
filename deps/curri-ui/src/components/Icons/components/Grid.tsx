import * as React from 'react'
import { SVGProps } from 'react'
const SvgGrid = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10 17.5h7.5V10H10v7.5ZM21.25 40h7.5v-7.5h-7.5V40ZM10 40h7.5v-7.5H10V40Zm0-11.25h7.5v-7.5H10v7.5Zm11.25 0h7.5v-7.5h-7.5v7.5ZM32.5 10v7.5H40V10h-7.5Zm-11.25 7.5h7.5V10h-7.5v7.5ZM32.5 28.75H40v-7.5h-7.5v7.5Zm0 11.25H40v-7.5h-7.5V40Z"
      fill="#000"
    />
  </svg>
)
export default SvgGrid
