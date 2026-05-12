import * as React from 'react'
import { SVGProps } from 'react'
const SvgInvoice = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M29 5H9.02L9 45h32V17L29 5Zm2 18h-8v2h8v10h-4v2h-4v-2h-4v-4h8v-2h-8V19h4v-2h4v2h4v4Z"
      fill="#000"
    />
  </svg>
)
export default SvgInvoice
