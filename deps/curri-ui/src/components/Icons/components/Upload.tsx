import * as React from 'react'
import { SVGProps } from 'react'
const SvgUpload = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.025.175c.219 0 .428.089.582.244l2.979 3a.825.825 0 1 1-1.171 1.162L8.018 2.167 5.58 4.585a.825.825 0 1 1-1.162-1.17l3.022-3a.825.825 0 0 1 .584-.24Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.022.196c.456 0 .825.37.825.825V12a.825.825 0 0 1-1.65 0V1.021c0-.456.37-.825.825-.825Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.175 9A2.825 2.825 0 0 1 3 6.175h2a.825.825 0 0 1 0 1.65H3c-.649 0-1.175.526-1.175 1.175v4c0 .649.526 1.175 1.175 1.175h10c.649 0 1.175-.526 1.175-1.175V9c0-.649-.526-1.175-1.175-1.175h-2a.825.825 0 0 1 0-1.65h2A2.825 2.825 0 0 1 15.825 9v4A2.825 2.825 0 0 1 13 15.825H3A2.825 2.825 0 0 1 .175 13V9Z"
      fill="#000"
    />
  </svg>
)
export default SvgUpload
