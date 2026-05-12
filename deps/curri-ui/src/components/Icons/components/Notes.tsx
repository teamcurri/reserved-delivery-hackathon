import * as React from 'react'
import { SVGProps } from 'react'
const Notes = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_3129_34232)">
      <path
        d="M9.33268 1.33398H2.66602V14.6673H13.3327V5.33398L9.33268 1.33398ZM10.666 10.6673H8.66602V12.6673H7.33268V10.6673H5.33268V9.33398H7.33268V7.33398H8.66602V9.33398H10.666V10.6673ZM8.66602 6.00065V2.33398L12.3327 6.00065H8.66602Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_3129_34232">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default Notes
