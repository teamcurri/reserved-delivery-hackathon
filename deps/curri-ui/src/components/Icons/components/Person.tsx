import * as React from 'react'
import { SVGProps } from 'react'
const SvgPerson = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 15 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15 15.688V19H0V15.688c0-2.757 2.523-5 5.625-5h3.75c3.102 0 5.625 2.243 5.625 5ZM7.5 9.75a4.693 4.693 0 0 0 4.688-4.688A4.693 4.693 0 0 0 7.5.375a4.693 4.693 0 0 0-4.688 4.688A4.693 4.693 0 0 0 7.5 9.75Z"
      fill="#000"
    />
  </svg>
)
export default SvgPerson
