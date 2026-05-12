import React, { FunctionComponent, ReactNode } from 'react'
import styled from 'styled-components'

import { breakpointConfig, BreakpointSize, queryConfig } from './utils'

const StyleXSmall = styled.div`
  display: none !important;
  @media only ${queryConfig.xsmall} {
    display: block !important;
  }
`

const StyleSmallOnly = styled.div`
  display: none !important;
  @media only ${queryConfig.smallOnly} {
    display: block !important;
  }
`

const StyleSmall = styled.div`
  display: none !important;
  @media only ${queryConfig.small} {
    display: block !important;
  }
`
const StyleMedium = styled.div`
  display: none !important;
  @media only ${queryConfig.medium} {
    display: block !important;
  }
`

const StyleMediumAndUp = styled.div`
  display: none !important;
  @media only ${queryConfig.mediumAndUp} {
    display: block !important;
  }
`

const StyleLarge = styled.div`
  display: none !important;
  @media only ${queryConfig.large} {
    display: block !important;
  }
`
const StyleXLarge = styled.div`
  display: none !important;
  @media only ${queryConfig.xlarge} {
    display: block !important;
  }
`

const FromTo = styled.div<{ from: string; to: string }>`
  display: none !important;
  @media screen and (min-width: ${({ from }) =>
      breakpointConfig[from]}px) and (max-width: ${({ to }) =>
      breakpointConfig[to]}px) {
    display: block !important;
  }
`

const From = styled.div<{ from: string }>`
  display: none !important;
  @media screen and (min-width: ${({ from }) => breakpointConfig[from]}px) {
    display: block !important;
  }
`

const To = styled.div<{ to: string }>`
  display: none !important;
  @media screen and (max-width: ${({ to }) => breakpointConfig[to]}px) {
    display: block !important;
  }
`

interface FCProps {
  children: ReactNode
}

const XSmall: React.FunctionComponent<FCProps> = ({ children }) => (
  <StyleXSmall>{children}</StyleXSmall>
)

const SmallOnly: React.FunctionComponent<FCProps> = ({
  children,
}: {
  children: ReactNode
}) => <StyleSmallOnly>{children}</StyleSmallOnly>
const Small: React.FunctionComponent<FCProps> = ({ children }) => (
  <StyleSmall>{children}</StyleSmall>
)
const Medium: React.FunctionComponent<FCProps> = ({ children }) => (
  <StyleMedium>{children}</StyleMedium>
)
const MediumAndUp: React.FunctionComponent<FCProps> = ({
  children,
}: {
  children: ReactNode
}) => <StyleMediumAndUp>{children}</StyleMediumAndUp>
const Large: React.FunctionComponent<FCProps> = ({ children }) => (
  <StyleLarge>{children}</StyleLarge>
)
const XLarge: React.FunctionComponent<FCProps> = ({ children }) => (
  <StyleXLarge>{children}</StyleXLarge>
)

export const Breakpoints: FunctionComponent<{
  size?: BreakpointSize
  from?: BreakpointSize
  to?: BreakpointSize
  children: ReactNode
}> = ({ size, children, from, to }) => {
  let component = <>{children}</>
  if (size) {
    switch (size) {
      case 'smallOnly':
        component = <SmallOnly>{children}</SmallOnly>
        break
      case 'xsmall':
        component = <XSmall>{children}</XSmall>
        break
      case 'small':
        component = <Small>{children}</Small>
        break
      case 'medium':
        component = <Medium>{children}</Medium>
        break
      case 'mediumAndUp':
        component = <MediumAndUp>{children}</MediumAndUp>
        break
      case 'large':
        component = <Large>{children}</Large>
        break
      case 'xlarge':
        component = <XLarge>{children}</XLarge>
        break
      default:
        break
    }
  } else if (from && to) {
    component = (
      <FromTo from={from} to={to}>
        {children}
      </FromTo>
    )
  } else if (from) {
    component = <From from={from}>{children}</From>
  } else if (to) {
    component = <To to={to}>{children}</To>
  }

  return component
}
