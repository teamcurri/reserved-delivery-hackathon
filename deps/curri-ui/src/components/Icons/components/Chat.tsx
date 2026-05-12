import * as React from 'react'
import { SVGProps } from 'react'
const SvgChat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M44.25 6.75H6.75v37.5l7.5-7.5h30v-30ZM19.875 23.625h-3.75v-3.75h3.75v3.75Zm7.5 0h-3.75v-3.75h3.75v3.75Zm7.5 0h-3.75v-3.75h3.75v3.75Z"
      fill="#000"
    />
  </svg>
)
export default SvgChat
