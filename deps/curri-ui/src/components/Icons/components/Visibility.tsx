import * as React from 'react'
import { SVGProps } from 'react'
const SvgVisibility = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8 2.667c-3.333 0-6.18 2.073-7.333 5 1.153 2.926 4 5 7.333 5s6.18-2.074 7.333-5c-1.153-2.927-4-5-7.333-5ZM8 11a3.335 3.335 0 0 1 0-6.667A3.335 3.335 0 0 1 8 11Zm0-5.333c-1.107 0-2 .893-2 2 0 1.106.893 2 2 2s2-.894 2-2c0-1.107-.893-2-2-2Z"
      fill="#000"
    />
  </svg>
)
export default SvgVisibility
