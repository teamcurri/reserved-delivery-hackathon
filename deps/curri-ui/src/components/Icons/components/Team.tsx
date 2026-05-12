import * as React from 'react'
import { SVGProps } from 'react'
const SvgTeam = (props: SVGProps<SVGSVGElement>) => (
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
      d="M35.052 27.675c2.803 1.902 4.766 4.48 4.766 7.916v6.136H48v-6.136c0-4.46-7.302-7.098-12.948-7.916Z"
      fill="#000"
    />
    <path
      d="M19.364 25.364a8.182 8.182 0 1 0 0-16.364 8.182 8.182 0 0 0 0 16.364Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M31.636 25.364a8.18 8.18 0 0 0 8.182-8.182A8.18 8.18 0 0 0 31.636 9c-.961 0-1.861.205-2.72.49a12.231 12.231 0 0 1 0 15.383c.859.286 1.759.49 2.72.49ZM19.364 27.41C13.902 27.41 3 30.15 3 35.59v6.137h32.727v-6.136c0-5.441-10.902-8.182-16.363-8.182Z"
      fill="#000"
    />
  </svg>
)
export default SvgTeam
