import * as React from 'react'
import { SVGProps } from 'react'
const SvgEdit = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#Edit_svg__a)">
      <path d="M4 23v5h5l14.747-14.747-5-5L4 23ZM28.547 8.453l-5-5-3.374 3.387 5 5 3.374-3.387Z" />
    </g>
    <defs>
      <clipPath id="Edit_svg__a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgEdit
