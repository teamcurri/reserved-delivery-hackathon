import * as React from 'react'
import { SVGProps } from 'react'
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3 1.825c-.649 0-1.175.526-1.175 1.175v12c0 .649.526 1.175 1.175 1.175h12c.649 0 1.175-.526 1.175-1.175V3c0-.649-.526-1.175-1.175-1.175H3ZM.175 3A2.825 2.825 0 0 1 3 .175h12A2.825 2.825 0 0 1 17.825 3v12A2.825 2.825 0 0 1 15 17.825H3A2.825 2.825 0 0 1 .175 15V3Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.175 5c0-.456.37-.825.825-.825h16a.825.825 0 0 1 0 1.65H1A.825.825 0 0 1 .175 5Z"
      fill="#000"
    />
    <path
      d="M9 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM13 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM9 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM13 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
      fill="#000"
    />
  </svg>
)
export default SvgCalendar
