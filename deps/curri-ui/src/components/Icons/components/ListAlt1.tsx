import * as React from 'react'
import { SVGProps } from 'react'
const SvgListAlt1 = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 22 14"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width={2} height={2} rx={1} />
    <rect y={6} width={2} height={2} rx={1} />
    <rect y={12} width={2} height={2} rx={1} />
    <path d="M19 0H6v2h13zM22 6H6v2h16zM17 12H6v2h11z" />
  </svg>
)
export default SvgListAlt1
