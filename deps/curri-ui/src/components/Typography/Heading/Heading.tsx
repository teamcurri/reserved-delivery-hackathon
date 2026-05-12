import React, { FunctionComponent, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'


import { queryConfig } from '../../..'

/**
 * @deprecated
 */

/**
 * __deprecatedHeadingSizes__
 *
 * Replace all x1-x6 to h1-h6 sizing for headings
 * @deprecated
 */
const deprecatedHeadingSizes = ['x1', 'x2', 'x3', 'x4', 'x5'] as const

const headingSizes = [
  'displayLarge',
  'displaySmall',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
] as const

const sizeMapping = {
  displayLarge: {
    desktop: {
      lineHeight: 64,
      size: 64,
    },
    mobile: {
      lineHeight: 64,
      size: 64,
    },
  },
  displaySmall: {
    desktop: {
      lineHeight: 48,
      size: 44,
    },
    mobile: {
      lineHeight: 48,
      size: 44,
    },
  },
  h1: {
    desktop: {
      lineHeight: 48,
      size: 40,
    },
    mobile: {
      lineHeight: 44,
      size: 36,
    },
  },
  h2: {
    desktop: {
      lineHeight: 44,
      size: 36,
    },
    mobile: {
      lineHeight: 40,
      size: 32,
    },
  },
  h3: {
    desktop: {
      lineHeight: 40,
      size: 32,
    },
    mobile: {
      lineHeight: 36,
      size: 28,
    },
  },
  h4: {
    desktop: {
      lineHeight: 36,
      size: 28,
    },
    mobile: {
      lineHeight: 32,
      size: 24,
    },
  },
  h5: {
    desktop: {
      lineHeight: 28,
      size: 20,
    },
    mobile: {
      lineHeight: 32,
      size: 24,
    },
  },
  h6: {
    desktop: {
      lineHeight: 28,
      size: 20,
    },
    mobile: {
      lineHeight: 24,
      size: 18,
    },
  },
  x1: {
    desktop: {
      lineHeight: 64,
      size: 64,
    },
    mobile: {
      lineHeight: 64,
      size: 64,
    },
  },
}

const defaultFontWeights = [
  'medium',
  'semi-bold',
  'bold',
  'extra-bold',
] as const

const fontWeightMapping = {
  'bold': 700,
  'extra-bold': 800,
  'medium': 500,
  'semi-bold': 600,
}

type HeadingSize =
  | (typeof deprecatedHeadingSizes)[number]
  | (typeof headingSizes)[number]

type Align = 'left' | 'center' | 'right'
type HeaderAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

type FontWeight = (typeof defaultFontWeights)[number]

type HeadingComponentProps = {
  as?: HeaderAs
  align?: Align
  children: ReactNode
  size: HeadingSize
  fontWeight?: FontWeight
  color?: string
  style?: React.CSSProperties
  className?: string
  textTransform?: 'capitalize' | 'lowercase' | 'none' | 'uppercase'
}

const baseHeadingStyles = css`
  font-family: 'Inter';
  font-weight: 700;
  margin: 0;
  color: var(--color-text-primary);
  text-align: left;
`

const lineHeightMultiplier = 1.25

const StyledHeading = styled.div.withConfig({
  shouldForwardProp: prop => !['size', 'color', 'textTransform', 'fontWeight'].includes(prop),
}).attrs<HeadingComponentProps>(props => {
  const { as } = props

  const ariaLevelMapping = {
    h1: 1,
    h2: 2,
    h3: 3,
    h4: 4,
    h5: 5,
    h6: 6,
  }

  return {
    'aria-level': as && ariaLevelMapping[as] ? ariaLevelMapping[as] : undefined,
  }
})`
  ${baseHeadingStyles}

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

  ${({ size = 'h1' }) => {
    switch (size) {
      // Deprecated Heading Styles
      case 'x1':
        return css`
          font-weight: 800;
          font-size: 1.75rem;
          line-height: calc(1.75rem * ${lineHeightMultiplier});
        `
      case 'x2':
        return css`
          font-weight: 900;
          font-size: 1.5rem;
          line-height: calc(1.5rem * ${lineHeightMultiplier});
        `
      case 'x3':
        return css`
          font-size: 1.125rem;
          line-height: calc(1.125rem * ${lineHeightMultiplier});
        `
      case 'x4':
        return css`
          font-size: 0.9375rem;
          line-height: calc(0.9375rem * ${lineHeightMultiplier});
        `
      case 'x5':
        return css`
          font-size: 0.875rem;
          line-height: calc(0.875rem * ${lineHeightMultiplier});
        `
    }

    return css`
      font-weight: 500;
      font-size: ${sizeMapping[size].mobile.size}px;
      line-height: ${sizeMapping[size].mobile.lineHeight}px;
      letter-spacing: -0.02em;
      @media only ${queryConfig.mediumAndUp} {
        font-size: ${sizeMapping[size].desktop.size}px;
        line-height: ${sizeMapping[size].desktop.lineHeight}px;
      }
    `
  }}

  ${({ textTransform = 'none' }) =>
    textTransform &&
    css`
      text-transform: ${textTransform};
    `}

  ${({ fontWeight = 'medium' }) =>
    fontWeight &&
    css`
      font-weight: ${fontWeightMapping[fontWeight]};
    `}

`

const HeadingBase: FunctionComponent<HeadingComponentProps> = props => {
  const {
    align,
    children,
    size,
    color,
    style,
    fontWeight,
    className,
    as,
    textTransform = 'none',
  } = props

  return (
    <StyledHeading
      as={as}
      role="heading"
      align={align}
      size={size}
      color={color}
      style={style}
      fontWeight={fontWeight}
      className={className}
      textTransform={textTransform}
    >
      {children}
    </StyledHeading>
  )
}

export const Heading = memo(HeadingBase)
