import * as React from 'react'
import { SVGProps } from 'react'
const SvgCloseCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0ZM8 6.585l2.121-2.121 1.414 1.414-2.12 2.121 2.12 2.122-1.413 1.414L8 9.413l-2.122 2.122-1.414-1.414 2.122-2.122-2.121-2.121 1.414-1.414L8 6.584Z"
      fill="#000"
    />
  </svg>
)
export default SvgCloseCircle
