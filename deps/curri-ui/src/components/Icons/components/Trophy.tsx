import * as React from 'react'
import { SVGProps } from 'react'
const SvgTrophy = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 13 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M6.6 1v1.6m4 0L9.4 3.8M2.6 2.6l1.2 1.2m6 7v-4A.8.8 0 0 0 9 6H4.2a.8.8 0 0 0-.8.8v4m6.4 0A3.2 3.2 0 0 1 6.6 14m3.2-3.2h.8a1.6 1.6 0 0 0 1.6-1.6v-.8a.8.8 0 0 0-.8-.8H9.8v3.2ZM6.6 14a3.2 3.2 0 0 1-3.2-3.2M6.6 14v2.9m-3.2-6.1h-.8A1.6 1.6 0 0 1 1 9.2v-.8a.8.8 0 0 1 .8-.8h1.6v3.2ZM9 17H4.2"
      stroke="#000"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)
export default SvgTrophy
