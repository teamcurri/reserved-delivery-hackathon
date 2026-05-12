import * as React from 'react'
import { SVGProps } from 'react'
const Message = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    role="img"
    {...props}
  >
    <path
      d="M13.6673 0.333984H0.340651L0.333984 13.6673L3.00065 11.0007H13.6673V0.333984ZM11.0007 8.33398H3.00065V7.00065H11.0007V8.33398ZM11.0007 6.33398H3.00065V5.00065H11.0007V6.33398ZM11.0007 4.33398H3.00065V3.00065H11.0007V4.33398Z"
      fill="black"
    />
  </svg>
)
export default Message
