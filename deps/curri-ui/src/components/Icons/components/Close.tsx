import * as React from 'react'
import { SVGProps } from 'react'

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_0_321)">
      <path
        d="M12.6666 4.27333L11.7266 3.33333L7.99998 7.06L4.27331 3.33333L3.33331 4.27333L7.05998 8L3.33331 11.7267L4.27331 12.6667L7.99998 8.94L11.7266 12.6667L12.6666 11.7267L8.93998 8L12.6666 4.27333Z"
        fill="#E0373C"
      />
    </g>
    <defs>
      <clipPath id="clip0_0_321">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgClose
