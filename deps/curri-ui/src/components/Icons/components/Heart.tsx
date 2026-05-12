import * as React from 'react'
import { SVGProps } from 'react'
const SvgHeart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="1em"
    height="1em"
    viewBox="0 0 17 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.905 1.85c-1.026.12-1.7.63-1.853 1.401a.825.825 0 0 1-1.618 0c-.15-.75-.825-1.248-1.884-1.36-1.068-.113-2.17.228-2.724.782a3.418 3.418 0 0 0 0 4.833l5.417 5.416 5.4-5.4c1.232-1.384 1.265-3.6.016-4.85-.613-.613-1.718-.944-2.754-.822ZM10.713.21c1.424-.167 3.07.251 4.113 1.295 1.954 1.953 1.784 5.187.03 7.135a.789.789 0 0 1-.03.032l-6 6a.825.825 0 0 1-1.167 0l-6-6a5.068 5.068 0 0 1 0-7.167C2.656.51 4.303.1 5.723.25c.898.095 1.845.437 2.511 1.114C8.884.68 9.811.317 10.713.21Z"
      fill="#000"
    />
  </svg>
)
export default SvgHeart
