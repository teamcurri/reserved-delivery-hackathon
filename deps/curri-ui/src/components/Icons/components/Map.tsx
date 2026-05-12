import * as React from 'react'
import { SVGProps } from 'react'
const SvgMap = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    xmlSpace="preserve"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M5 94.3c0 1.2.9 2.1 2.1 2.1.4 0 .8-.1 1.1-.3L35 80l28.8 17.3c.7.4 1.6.4 2.4 0l27-16.2c1.1-.6 1.8-1.8 1.8-3.1V5.7c0-1.2-.9-2.1-2.1-2.1-.4 0-.8.1-1.1.3L65 20 36.2 2.7c-.7-.4-1.6-.4-2.4 0l-27 16.2c-1.1.7-1.8 1.9-1.8 3.2v72.2zM35 16l30 18v50L35 66V16z" />
  </svg>
)
export default SvgMap
