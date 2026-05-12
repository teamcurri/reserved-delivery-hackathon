import * as React from 'react'
import { SVGProps } from 'react'
const SvgSmallSquare = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 7 7"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.175 1.91C.175.95.951.174 1.909.174h3.182c.958 0 1.734.776 1.734 1.734v3.182c0 .958-.776 1.734-1.734 1.734H1.909A1.734 1.734 0 0 1 .175 5.091V1.909Zm1.734-.085a.084.084 0 0 0-.084.084v3.182c0 .046.038.084.084.084h3.182a.084.084 0 0 0 .084-.084V1.909a.084.084 0 0 0-.084-.084H1.909Z"
      fill="#000"
    />
  </svg>
)
export default SvgSmallSquare
