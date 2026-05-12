import * as React from 'react'
import { SVGProps } from 'react'
const SvgTrashCan = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 16 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.163 2.175h1.674a1.172 1.172 0 0 0-1.674 0Zm3.54 0H13c.456 0 .825.37.825.825v12A2.825 2.825 0 0 1 11 17.825H5A2.825 2.825 0 0 1 2.175 15V3c0-.456.37-.825.825-.825h2.297a2.826 2.826 0 0 1 5.406 0Zm-6.878 1.65V15c0 .649.526 1.175 1.175 1.175h6c.649 0 1.175-.526 1.175-1.175V3.825h-8.35Z"
      fill="#000"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M.175 3c0-.456.37-.825.825-.825h14a.825.825 0 0 1 0 1.65H1A.825.825 0 0 1 .175 3ZM6 5.175c.456 0 .825.37.825.825v8a.825.825 0 0 1-1.65 0V6c0-.456.37-.825.825-.825ZM10 5.175c.456 0 .825.37.825.825v8a.825.825 0 0 1-1.65 0V6c0-.456.37-.825.825-.825Z"
      fill="#000"
    />
  </svg>
)
export default SvgTrashCan
