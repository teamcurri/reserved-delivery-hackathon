import * as React from 'react'
import { SVGProps } from 'react'

const SvgInvoiceSent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#clip0_0_342)">
      <path
        d="M11.6667 1.66667H3.34171L3.33337 18.3333H16.6667V6.66667L11.6667 1.66667ZM12.5 9.16667H9.16671V10H12.5V14.1667H10.8334V15H9.16671V14.1667H7.50004V12.5H10.8334V11.6667H7.50004V7.5H9.16671V6.66667H10.8334V7.5H12.5V9.16667Z"
        fill={props.color ?? '#04EEAD'}
      />
    </g>
    <defs>
      <clipPath id="clip0_0_342">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgInvoiceSent
