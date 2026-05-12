import * as React from 'react'
import { SVGProps } from 'react'
const Error = (props: SVGProps<SVGSVGElement>) => (
  <svg
    height={props.height ?? '1em'}
    width={props.width ?? '1em'}
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.5 0C5.152 0 0 5.152 0 11.5C0 17.848 5.152 23 11.5 23C17.848 23 23 17.848 23 11.5C23 5.152 17.848 0 11.5 0ZM12.65 18.4H10.35V16.1H12.65V18.4ZM12.65 14.95H10.35V4.6H12.65V14.95Z"
      fill={props.fill ?? '#000'}
    />
  </svg>
)
export default Error
