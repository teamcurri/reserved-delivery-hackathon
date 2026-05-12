import React, { FunctionComponent, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'


import { breakpointConfig } from '../../Breakpoints/utils'

type ColComponentProps = {
  children: ReactNode
  className?: string
  width?: number | number[]
  height?: number
  top?: number | string
  left?: number | string
  middle?: boolean
  center?: boolean
  area?: string
  style?: React.CSSProperties
}
const COL_CUSTOM_PROPS = new Set(['middle', 'center', 'area', 'top', 'left', 'height', 'width'])

const StyledCol = styled.div.withConfig({
  shouldForwardProp: prop => !COL_CUSTOM_PROPS.has(prop),
})<ColComponentProps>`
  height: 100%;
  min-width: 0;
  /* grid-column-end: ${({ width = 1 }) => `span ${width}`}; */
  grid-row-end: ${({ height = 1 }) => `span ${height}`};
  ${({ left }) => left && `grid-column-start: ${left}`};
  ${({ top }) => top && `grid-row-start: ${top}`};
  ${({ center }) => center && `text-align: center`};
  ${({ area }) => area && `grid-area: ${area}`};
  ${({ middle }) =>
    middle &&
    `
      display: inline-flex;
      flex-flow: column wrap;
      justify-content: center;
      justify-self: stretch;`};

  ${({ width }) => {
    if (Array.isArray(width)) {
      const [sm, md, lg, xl] = width
      return css`
        grid-column-end: span ${sm};
        @media only screen and (min-width: ${breakpointConfig.small}px) {
          grid-column-end: span ${md};
        }
        @media only screen and (min-width: ${breakpointConfig.medium}px) {
          grid-column-end: span ${lg};
        }
        @media only screen and (min-width: ${breakpointConfig.large}px) {
          grid-column-end: span ${xl};
        }
      }
      `
    } else {
      return css`
        grid-column-end: span ${width};
      `
    }
  }}
`

const ColBase: FunctionComponent<ColComponentProps> = ({
  children,
  ...rest
}) => {
  return <StyledCol {...rest}>{children}</StyledCol>
}

export const Col = memo(ColBase)
