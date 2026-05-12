import * as React from 'react'
import { SVGProps } from 'react'
const SvgBoxFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 21 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m10.813 1.18 7.812 3.785v10.07l-7.813 3.784L3 15.035V4.964l7.813-3.785ZM4.25 6.354v7.897l5.938 2.877V9.23L4.25 6.354Zm7.188 2.877v7.897l5.937-2.877V6.354l-5.938 2.877Zm5.129-3.874-5.755 2.788-5.754-2.788 5.755-2.788 5.754 2.788Z"
      fill="#000"
    />
    <path
      d="m3.625 5.625 7.188 3.41L18 5.624v9.09l-7.188 3.41-7.187-3.41v-9.09Z"
      fill="#000"
    />
  </svg>
)
export default SvgBoxFilled
