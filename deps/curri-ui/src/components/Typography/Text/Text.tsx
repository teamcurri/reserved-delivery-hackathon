import React, { FunctionComponent, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'


const TextSizes = ['sm', 'md', 'lg'] as const

type Size = (typeof TextSizes)[number]
type Align = 'left' | 'center' | 'right'
type Display = 'inline' | 'inline-block' | 'block'
type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'

type TextComponentProps = {
  align?: Align
  children: ReactNode
  size: Size
  color?: string
  style?: React.CSSProperties
  display?: Display
  className?: string
  textTransform?: TextTransform
}

const TextStyles = css`
  font-family: 'Inter';
  margin: 0;
  color: var(--color-text-primary);
  text-align: left;
  display: inline-block;
`

const StyleText = styled.p.withConfig({
  shouldForwardProp: prop => !['size', 'color', 'display', 'textTransform', 'align'].includes(prop),
})<TextComponentProps>`
  ${TextStyles};

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}

  ${({ align }) =>
    align &&
    css`
      text-align: ${align};
    `}

  ${({ textTransform }) =>
    textTransform &&
    css`
      text-transform: ${textTransform};
    `}

  ${({ display }) => {
    switch (display) {
      case 'block':
        return css`
          display: block;
        `
      case 'inline-block':
        return css`
          display: inline-block;
        `
      case 'inline':
        return css`
          display: inline;
        `
    }
  }}

  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          font-size: 12px;
          font-weight: 400;
          line-height: 1.5;
        `
      case 'md':
        return css`
          font-size: 14px;
          font-weight: 400;
          line-height: 1.5;
        `
      case 'lg':
        return css`
          font-size: 16px;
          font-weight: 400;
          line-height: 1.5;
        `
    }
  }}
`

const TextBase: FunctionComponent<TextComponentProps> = props => {
  const {
    align,
    children,
    size,
    color,
    style,
    display,
    textTransform = 'none',
    className,
  } = props

  return (
    <StyleText
      align={align}
      size={size}
      color={color}
      style={style}
      display={display}
      className={className}
      textTransform={textTransform}
    >
      {children}
    </StyleText>
  )
}

/**
 * @deprecated
 */

/**
 * __Text__
 *
 * Replace `Text` with `Paragraph` component
 * @deprecated
 */
export const Text = memo(TextBase)
