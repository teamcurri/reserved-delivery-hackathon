import * as React from 'react'
import { SVGProps } from 'react'
const SvgPayment = (props: SVGProps<SVGSVGElement>) => (
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
      d="M45.188 10H5.812A2.82 2.82 0 0 0 3 12.813v2.812h45v-2.813A2.82 2.82 0 0 0 45.187 10ZM3 38.125a2.82 2.82 0 0 0 2.813 2.813h39.374A2.82 2.82 0 0 0 48 38.124V21.25H3v16.875ZM18.469 32.5H32.53c.788 0 1.407.619 1.407 1.406 0 .788-.62 1.407-1.407 1.407H18.47a1.393 1.393 0 0 1-1.407-1.407A1.41 1.41 0 0 1 18.47 32.5Zm-8.438 0h2.813c.787 0 1.406.619 1.406 1.406 0 .788-.619 1.407-1.406 1.407H10.03a1.393 1.393 0 0 1-1.406-1.407 1.41 1.41 0 0 1 1.406-1.406Z"
      fill="#000"
    />
  </svg>
)
export default SvgPayment
