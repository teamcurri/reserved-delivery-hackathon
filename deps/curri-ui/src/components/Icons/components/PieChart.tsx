import * as React from 'react'
import { SVGProps } from 'react'
const SvgPieChart = (props: SVGProps<SVGSVGElement>) => (
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
      d="M23.908 26.177V5c11.596 0 21.008 8.571 21.008 21.177H23.908ZM5 26.008c0-9.726 7.353-17.73 16.807-18.781v21.05h20.882C41.64 36.681 33.635 45 23.908 45 13.466 45 5 36.45 5 26.008Z"
      fill="#000"
    />
  </svg>
)
export default SvgPieChart
