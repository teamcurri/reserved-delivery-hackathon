import * as React from 'react'
import { SVGProps } from 'react'
const SvgCreditCard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 19 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.5 1.825c-.649 0-1.175.526-1.175 1.175v7c0 .649.526 1.175 1.175 1.175h12c.649 0 1.175-.526 1.175-1.175V3c0-.649-.526-1.175-1.175-1.175h-12ZM.675 3A2.825 2.825 0 0 1 3.5.175h12A2.825 2.825 0 0 1 18.325 3v7a2.825 2.825 0 0 1-2.825 2.825h-12A2.825 2.825 0 0 1 .675 10V3Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1 4.5h17v2H1v-2Z"
      fill="#000"
    />
  </svg>
)
export default SvgCreditCard
