import React from 'react'

import { Svgs } from '..'

export const Logo: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    color?: string
  }
> = ({ color, width = 63, ...rest }) => {
  return <Svgs.CurriLogo {...rest} width={width} fill={color} />
}

export const LogoC: React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    color?: string
  }
> = ({ color, width = 63, ...rest }) => {
  return <Svgs.CurriLogoC {...rest} width={width} fill={color} />
}
