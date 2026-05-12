import * as React from 'react'
import { SVGProps } from 'react'
const SvgTeams = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M13.75 10c1.15 0 2.075-.933 2.075-2.083 0-1.15-.925-2.084-2.075-2.084a2.084 2.084 0 0 0 0 4.167ZM7.5 9.167a2.49 2.49 0 0 0 2.492-2.5 2.497 2.497 0 1 0-4.992 0c0 1.383 1.117 2.5 2.5 2.5Zm6.25 2.5c-1.525 0-4.583.766-4.583 2.291v1.875h9.166v-1.875c0-1.525-3.058-2.291-4.583-2.291Zm-6.25-.834c-1.942 0-5.833.975-5.833 2.917v2.083H7.5v-1.875c0-.708.275-1.95 1.975-2.891-.725-.15-1.425-.234-1.975-.234Z"
      fill="#7E8085"
    />
  </svg>
)
export default SvgTeams
