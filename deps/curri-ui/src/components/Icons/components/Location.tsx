import * as React from 'react'
import { SVGProps } from 'react'

const SvgLocation = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 7.64706C16 4.53176 13.31 2 10 2C6.69 2 4 4.53176 4 7.64706C4 11.8824 10 18 10 18C10 18 16 11.8824 16 7.64706ZM8 7.64706C8 6.61176 8.9 5.76471 10 5.76471C11.1 5.76471 12 6.61176 12 7.64706C12 8.68235 11.11 9.52941 10 9.52941C8.9 9.52941 8 8.68235 8 7.64706Z"
        fill="black"
      />
    </svg>
  )
}

export default SvgLocation
