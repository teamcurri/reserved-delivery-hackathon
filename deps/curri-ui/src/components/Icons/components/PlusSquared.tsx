import * as React from 'react'
import { SVGProps } from 'react'
const SvgPlusSquared = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.175 3A2.825 2.825 0 0 1 3 .175h8A2.825 2.825 0 0 1 13.825 3v8A2.825 2.825 0 0 1 11 13.825H3A2.825 2.825 0 0 1 .175 11V3ZM3 1.825c-.649 0-1.175.526-1.175 1.175v8c0 .649.526 1.175 1.175 1.175h8c.649 0 1.175-.526 1.175-1.175V3c0-.649-.526-1.175-1.175-1.175H3Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 3.175c.456 0 .825.37.825.825v6.056a.825.825 0 0 1-1.65 0V4c0-.456.37-.825.825-.825Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.825 7c0 .456-.37.825-.825.825H4a.825.825 0 1 1 0-1.65h6c.456 0 .825.37.825.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgPlusSquared
