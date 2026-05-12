import * as React from 'react'
import { SVGProps } from 'react'
const SvgProfile = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.015 41.775H47V9H2c.015 12.717.015 17.011.015 27.517v5.258Zm16.87-20.484c0 2.261-1.669 4.097-3.742 4.097s-3.756-1.836-3.756-4.097c0-2.262 1.683-4.097 3.756-4.097 2.073 0 3.741 1.835 3.741 4.097ZM7.637 30.44c0-2 5.181-3.005 7.498-3.005 2.316 0 7.497 1.005 7.497 3.004v3.141H7.638v-3.14Zm33.739-12.223H26.382v3.073h14.995v-3.073Zm-14.995 6.145h14.995v3.073H26.382v-3.073Zm7.497 6.146h-7.497v3.072h7.497V30.51Z"
      fill="#000"
    />
  </svg>
)
export default SvgProfile
