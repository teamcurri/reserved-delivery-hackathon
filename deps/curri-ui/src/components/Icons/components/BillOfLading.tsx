import * as React from 'react'
import { SVGProps } from 'react'
const SvgBillOfLading = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      clipRule="evenodd"
      d="M6 29h21V10l-8-8H6v27Zm9.997-17.87a1.443 1.443 0 1 0 0-2.886 1.443 1.443 0 0 0 0 2.886Zm3.443-1.443a3.444 3.444 0 0 1-2.252 3.231V14.5H18.5v2h-1.312v6.893a5.257 5.257 0 0 0 4.055-4.571l.024-.224h2.503l-.02.268a7.754 7.754 0 0 1-15.461 0l-.02-.268h2.502l.024.224a5.257 5.257 0 0 0 4.098 4.58V16.5H13.5v-2h1.393v-1.551a3.444 3.444 0 0 1 1.104-6.705 3.443 3.443 0 0 1 3.443 3.443Z"
    />
  </svg>
)
export default SvgBillOfLading
