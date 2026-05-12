import * as React from 'react'
import { SVGProps } from 'react'
const SvgAddressBook = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9.482 5h29.63v40H9.481v-4.444h5.387V34.63H9.482v-2.963h5.387V25.74H9.482v-2.963h5.387v-5.926H9.482v-2.963h5.387V7.963H9.482V5Z"
      fill="#000"
    />
    <path
      fill="#000"
      d="M8 9.445h5.926v2.963H8zM8 18.333h5.926v2.963H8zM8 27.222h5.926v2.963H8zM8 36.111h5.926v2.963H8zM40.593 5h1.481v40h-1.481z"
    />
  </svg>
)
export default SvgAddressBook
