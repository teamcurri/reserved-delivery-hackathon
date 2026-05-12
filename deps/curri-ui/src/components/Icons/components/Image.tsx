import * as React from 'react'
import { SVGProps } from 'react'
const Image = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3129_40792)">
      <path
        d="M15.3327 2H0.666016V14H15.3327V2ZM3.33268 11.3333L5.66602 8.33333L7.33268 10.34L9.66602 7.33333L12.666 11.3333H3.33268Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_3129_40792">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default Image
