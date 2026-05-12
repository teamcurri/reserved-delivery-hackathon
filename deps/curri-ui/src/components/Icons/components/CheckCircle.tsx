import * as React from 'react'
import { SVGProps } from 'react'

const SvgCheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_0_320)">
      <path
        d="M7.99998 1.33333C4.31998 1.33333 1.33331 4.32 1.33331 8C1.33331 11.68 4.31998 14.6667 7.99998 14.6667C11.68 14.6667 14.6666 11.68 14.6666 8C14.6666 4.32 11.68 1.33333 7.99998 1.33333ZM6.66665 11.7733L3.33331 8.43996L4.27331 7.49996L6.66665 9.88663L11.7266 4.82663L12.6666 5.77329L6.66665 11.7733Z"
        fill="#04EEAD"
      />
    </g>
    <defs>
      <clipPath id="clip0_0_320">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgCheckCircle
