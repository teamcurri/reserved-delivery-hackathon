import React, { FunctionComponent, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'


export const ParagraphSizeNames = [
  'xsmall',
  'small',
  'medium',
  'large',
] as const

export const ParagraphSizes = {
  large: {
    fontSize: 18,
    lineHeight: 28,
  },
  medium: {
    fontSize: 16,
    lineHeight: 24,
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
  },
  xsmall: {
    fontSize: 12,
    lineHeight: 20,
  },
}

const defaultFontWeights = ['regular', 'medium', 'semi-bold'] as const

const fontWeightMapping = {
  'medium': 500,
  'regular': 400,
  'semi-bold': 600,
}

const displayMapping = {
  'block': 'block',
  'inline': 'inline',
  'inline-block': 'inline-block',
}

type Size = (typeof ParagraphSizeNames)[number]
type Align = 'left' | 'center' | 'right'
type Display = 'inline' | 'inline-block' | 'block'
type TextTransform = 'uppercase' | 'lowercase' | 'capitalize' | 'none'
type FontWeight = (typeof defaultFontWeights)[number]

type ParagraphComponentProps = {
  align?: Align
  children: ReactNode
  size: Size
  color?: string
  style?: React.CSSProperties
  display?: Display
  className?: string
  textTransform?: TextTransform
  fontWeight?: FontWeight
  isItalic?: boolean
  isStrikeout?: boolean
  isUnderline?: boolean
}

const BaseTextStyles = css`
  margin: 0;
  font-weight: 400;
  color: var(--color-text-primary);
  text-align: left;
  display: inline-block;
`

const StyleText = styled.p.withConfig({
  shouldForwardProp: prop => !['size', 'color', 'display', 'textTransform', 'fontWeight', 'isItalic', 'isStrikeout', 'isUnderline'].includes(prop),
})<ParagraphComponentProps>`
  ${BaseTextStyles};

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

  ${({ isItalic }) =>
    isItalic &&
    css`
      font-style: italic;
    `}

  ${({ isStrikeout }) =>
    isStrikeout &&
    css`
      text-decoration-line: line-through;
    `}

  ${({ isUnderline }) =>
    isUnderline &&
    css`
      text-decoration: underline;
    `}

  ${({ textTransform }) =>
    textTransform &&
    css`
      text-transform: ${textTransform};
    `}

  ${({ display = 'inline-block' }) =>
    display &&
    css`
      display: ${displayMapping[display]};
    `}

  ${({ size = 'small' }) => {
    return css`
      font-size: ${ParagraphSizes[size].fontSize}px;
      line-height: ${ParagraphSizes[size].lineHeight}px;
    `
  }}

  ${({ fontWeight = 'regular' }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeightMapping[fontWeight]};
    `}

`

const ParagraphBase: FunctionComponent<ParagraphComponentProps> = props => {
  const {
    align,
    children,
    size,
    color,
    style,
    display,
    textTransform = 'none',
    fontWeight = 'regular',
    className,
    isItalic,
    isStrikeout,
    isUnderline,
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
      fontWeight={fontWeight}
      isItalic={isItalic}
      isStrikeout={isStrikeout}
      isUnderline={isUnderline}
    >
      {children}
    </StyleText>
  )
}

export const Paragraph = memo(ParagraphBase)
