import React, { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'

import { Colors } from '../../foundations'
import { Icons } from '../Icons'
import { Spinner } from '../Spinner'
import { ParagraphSizes } from '../Typography'

const SharedButtonFontStyles = css`
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 600;
`

export type Color = 'black' | 'teal' | 'red' | 'white'
export type Variant = 'filled' | 'outlined' | 'bare'
export type Size = 'large' | 'medium' | 'small' | 'xsmall'
type VisibleState = 'normal' | 'disabled' | 'loading' | 'active'

type Combination = `${Color}-${Variant}-${VisibleState}`
type ColorsByCombination = {
  [key in Combination]: string
}

interface StyledProps {
  color?: Color
  state: VisibleState
  variant?: Variant
  isCenter?: boolean
  isFullWidth?: boolean
  size?: Size
  iconTypeCenter?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | ReactNode
  iconTypeLeft?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | ReactNode
  iconTypeRight?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | ReactNode
}

const sizeMapping = {
  large: {
    fontSize: ParagraphSizes.large.fontSize,
    height: 56,
    lineHeight: ParagraphSizes.large.lineHeight,
    svgSize: 20,
  },
  medium: {
    fontSize: ParagraphSizes.medium.fontSize,
    height: 48,
    lineHeight: ParagraphSizes.medium.lineHeight,
    svgSize: 20,
  },
  small: {
    fontSize: ParagraphSizes.small.fontSize,
    height: 40,
    lineHeight: ParagraphSizes.small.lineHeight,
    svgSize: 16,
  },
  xsmall: {
    fontSize: ParagraphSizes.xsmall.fontSize,
    height: 32,
    lineHeight: ParagraphSizes.xsmall.lineHeight,
    svgSize: 14,
  },
}

const backgroundColors: ColorsByCombination = {
  'black-bare-active': Colors.TRANSPARENT,
  'black-bare-disabled': Colors.TRANSPARENT,
  'black-bare-loading': Colors.TRANSPARENT,
  'black-bare-normal': Colors.TRANSPARENT,
  'black-filled-active': Colors.GREY_700,
  'black-filled-disabled': Colors.GREY_200,
  'black-filled-loading': Colors.GREY_700,
  'black-filled-normal': Colors.BLACK,
  'black-outlined-active': Colors.WHITE,
  'black-outlined-disabled': Colors.WHITE,
  'black-outlined-loading': Colors.WHITE,
  'black-outlined-normal': Colors.WHITE,
  'red-bare-active': Colors.TRANSPARENT,
  'red-bare-disabled': Colors.TRANSPARENT,
  'red-bare-loading': Colors.TRANSPARENT,
  'red-bare-normal': Colors.TRANSPARENT,
  'red-filled-active': Colors.RED_400,
  'red-filled-disabled': Colors.RED_200,
  'red-filled-loading': Colors.RED_300,
  'red-filled-normal': Colors.RED_500,
  'red-outlined-active': Colors.WHITE,
  'red-outlined-disabled': Colors.WHITE,
  'red-outlined-loading': Colors.WHITE,
  'red-outlined-normal': Colors.WHITE,
  'teal-bare-active': Colors.TRANSPARENT,
  'teal-bare-disabled': Colors.TRANSPARENT,
  'teal-bare-loading': Colors.TRANSPARENT,
  'teal-bare-normal': Colors.TRANSPARENT,
  'teal-filled-active': Colors.TEAL_400,
  'teal-filled-disabled': Colors.TEAL_200,
  'teal-filled-loading': Colors.TEAL_300,
  'teal-filled-normal': Colors.TEAL_500,
  'teal-outlined-active': Colors.WHITE,
  'teal-outlined-disabled': Colors.WHITE,
  'teal-outlined-loading': Colors.WHITE,
  'teal-outlined-normal': Colors.WHITE,
  'white-bare-active': Colors.TRANSPARENT,
  'white-bare-disabled': Colors.TRANSPARENT,
  'white-bare-loading': Colors.TRANSPARENT,
  'white-bare-normal': Colors.TRANSPARENT,
  'white-filled-active': Colors.GREY_050,
  'white-filled-disabled': Colors.GREY_200,
  'white-filled-loading': Colors.GREY_050,
  'white-filled-normal': Colors.WHITE,
  'white-outlined-active': Colors.WHITE,
  'white-outlined-disabled': Colors.WHITE,
  'white-outlined-loading': Colors.WHITE,
  'white-outlined-normal': Colors.WHITE,
}

const backgroundColorsHover: ColorsByCombination = {
  'black-bare-active': Colors.TRANSPARENT,
  'black-bare-disabled': Colors.TRANSPARENT,
  'black-bare-loading': Colors.TRANSPARENT,
  'black-bare-normal': Colors.TRANSPARENT,
  'black-filled-active': Colors.GREY_700,
  'black-filled-disabled': Colors.GREY_700,
  'black-filled-loading': Colors.GREY_700,
  'black-filled-normal': Colors.GREY_700,
  'black-outlined-active': Colors.WHITE,
  'black-outlined-disabled': Colors.WHITE,
  'black-outlined-loading': Colors.WHITE,
  'black-outlined-normal': Colors.WHITE,
  'red-bare-active': Colors.TRANSPARENT,
  'red-bare-disabled': Colors.TRANSPARENT,
  'red-bare-loading': Colors.TRANSPARENT,
  'red-bare-normal': Colors.TRANSPARENT,
  'red-filled-active': Colors.RED_400,
  'red-filled-disabled': Colors.RED_400,
  'red-filled-loading': Colors.RED_400,
  'red-filled-normal': Colors.RED_400,
  'red-outlined-active': Colors.WHITE,
  'red-outlined-disabled': Colors.WHITE,
  'red-outlined-loading': Colors.WHITE,
  'red-outlined-normal': Colors.WHITE,
  'teal-bare-active': Colors.TRANSPARENT,
  'teal-bare-disabled': Colors.TRANSPARENT,
  'teal-bare-loading': Colors.TRANSPARENT,
  'teal-bare-normal': Colors.TRANSPARENT,
  'teal-filled-active': Colors.TEAL_400,
  'teal-filled-disabled': Colors.TEAL_400,
  'teal-filled-loading': Colors.TEAL_400,
  'teal-filled-normal': Colors.TEAL_400,
  'teal-outlined-active': Colors.WHITE,
  'teal-outlined-disabled': Colors.WHITE,
  'teal-outlined-loading': Colors.WHITE,
  'teal-outlined-normal': Colors.WHITE,
  'white-bare-active': Colors.TRANSPARENT,
  'white-bare-disabled': Colors.TRANSPARENT,
  'white-bare-loading': Colors.TRANSPARENT,
  'white-bare-normal': Colors.TRANSPARENT,
  'white-filled-active': Colors.GREY_050,
  'white-filled-disabled': Colors.GREY_050,
  'white-filled-loading': Colors.GREY_050,
  'white-filled-normal': Colors.GREY_050,
  'white-outlined-active': Colors.GREY_050,
  'white-outlined-disabled': Colors.GREY_050,
  'white-outlined-loading': Colors.GREY_050,
  'white-outlined-normal': Colors.GREY_050,
}

const borderColors: ColorsByCombination = {
  ...backgroundColors,
  'black-bare-active': Colors.TRANSPARENT,
  'black-bare-disabled': Colors.TRANSPARENT,
  'black-bare-loading': Colors.TRANSPARENT,
  'black-bare-normal': Colors.TRANSPARENT,
  'black-outlined-active': backgroundColors['black-filled-active'],
  'black-outlined-disabled': backgroundColors['black-filled-disabled'],
  'black-outlined-loading': backgroundColors['black-filled-loading'],
  'black-outlined-normal': Colors.GREY_200,
  'red-bare-active': Colors.TRANSPARENT,
  'red-bare-disabled': Colors.TRANSPARENT,
  'red-bare-loading': Colors.TRANSPARENT,
  'red-bare-normal': Colors.TRANSPARENT,
  'red-outlined-active': backgroundColors['red-filled-active'],
  'red-outlined-disabled': backgroundColors['red-filled-disabled'],
  'red-outlined-loading': backgroundColors['red-filled-loading'],
  'red-outlined-normal': backgroundColors['red-filled-normal'],
  'teal-bare-active': Colors.TRANSPARENT,
  'teal-bare-disabled': Colors.TRANSPARENT,
  'teal-bare-loading': Colors.TRANSPARENT,
  'teal-bare-normal': Colors.TRANSPARENT,
  'teal-outlined-active': backgroundColors['teal-filled-active'],
  'teal-outlined-disabled': backgroundColors['teal-filled-disabled'],
  'teal-outlined-loading': backgroundColors['teal-filled-loading'],
  'teal-outlined-normal': backgroundColors['teal-filled-normal'],
  'white-bare-active': Colors.TRANSPARENT,
  'white-bare-disabled': Colors.TRANSPARENT,
  'white-bare-loading': Colors.TRANSPARENT,
  'white-bare-normal': Colors.TRANSPARENT,
  'white-outlined-active': Colors.BLACK,
  'white-outlined-disabled': Colors.GREY_700,
  'white-outlined-loading': Colors.GREY_700,
  'white-outlined-normal': Colors.BLACK,
}

const borderColorsHover: ColorsByCombination = {
  ...backgroundColorsHover,
  'black-bare-active': Colors.TRANSPARENT,
  'black-bare-disabled': Colors.TRANSPARENT,
  'black-bare-loading': Colors.TRANSPARENT,
  'black-bare-normal': Colors.TRANSPARENT,
  'black-outlined-active': backgroundColorsHover['black-filled-active'],
  'black-outlined-disabled': backgroundColorsHover['black-filled-disabled'],
  'black-outlined-loading': backgroundColorsHover['black-filled-loading'],
  'black-outlined-normal': backgroundColorsHover['black-filled-normal'],
  'red-bare-active': Colors.TRANSPARENT,
  'red-bare-disabled': Colors.TRANSPARENT,
  'red-bare-loading': Colors.TRANSPARENT,
  'red-bare-normal': Colors.TRANSPARENT,
  'red-outlined-active': backgroundColorsHover['red-filled-active'],
  'red-outlined-disabled': backgroundColorsHover['red-filled-disabled'],
  'red-outlined-loading': backgroundColorsHover['red-filled-loading'],
  'red-outlined-normal': backgroundColorsHover['red-filled-normal'],
  'teal-bare-active': Colors.TRANSPARENT,
  'teal-bare-disabled': Colors.TRANSPARENT,
  'teal-bare-loading': Colors.TRANSPARENT,
  'teal-bare-normal': Colors.TRANSPARENT,
  'teal-outlined-active': backgroundColorsHover['teal-filled-active'],
  'teal-outlined-disabled': backgroundColorsHover['teal-filled-disabled'],
  'teal-outlined-loading': backgroundColorsHover['teal-filled-loading'],
  'teal-outlined-normal': backgroundColorsHover['teal-filled-normal'],
  'white-outlined-active': Colors.BLACK,
  'white-outlined-disabled': Colors.BLACK,
  'white-outlined-loading': Colors.BLACK,
  'white-outlined-normal': Colors.BLACK,
}

const textColors: ColorsByCombination = {
  'black-bare-active': Colors.GREY_700,
  'black-bare-disabled': Colors.GREY_500,
  'black-bare-loading': Colors.BLACK,
  'black-bare-normal': Colors.BLACK,
  'black-filled-active': Colors.WHITE,
  'black-filled-disabled': Colors.GREY_500,
  'black-filled-loading': Colors.WHITE,
  'black-filled-normal': Colors.WHITE,
  'black-outlined-active': Colors.GREY_700,
  'black-outlined-disabled': Colors.GREY_500,
  'black-outlined-loading': Colors.BLACK,
  'black-outlined-normal': Colors.BLACK,
  'red-bare-active': Colors.RED_500,
  'red-bare-disabled': Colors.RED_200,
  'red-bare-loading': Colors.RED_500,
  'red-bare-normal': Colors.RED_500,
  'red-filled-active': Colors.WHITE,
  'red-filled-disabled': Colors.WHITE,
  'red-filled-loading': Colors.WHITE,
  'red-filled-normal': Colors.WHITE,
  'red-outlined-active': Colors.RED_500,
  'red-outlined-disabled': Colors.RED_200,
  'red-outlined-loading': Colors.RED_500,
  'red-outlined-normal': Colors.RED_500,
  'teal-bare-active': Colors.GREY_700,
  'teal-bare-disabled': Colors.GREY_500,
  'teal-bare-loading': Colors.BLACK,
  'teal-bare-normal': Colors.BLACK,
  'teal-filled-active': Colors.GREY_700,
  'teal-filled-disabled': Colors.GREY_500,
  'teal-filled-loading': Colors.BLACK,
  'teal-filled-normal': Colors.BLACK,
  'teal-outlined-active': Colors.GREY_700,
  'teal-outlined-disabled': Colors.GREY_500,
  'teal-outlined-loading': Colors.BLACK,
  'teal-outlined-normal': Colors.BLACK,
  'white-bare-active': Colors.GREY_700,
  'white-bare-disabled': Colors.GREY_500,
  'white-bare-loading': Colors.BLACK,
  'white-bare-normal': Colors.BLACK,
  'white-filled-active': Colors.BLACK,
  'white-filled-disabled': Colors.GREY_500,
  'white-filled-loading': Colors.BLACK,
  'white-filled-normal': Colors.BLACK,
  'white-outlined-active': Colors.GREY_700,
  'white-outlined-disabled': Colors.GREY_500,
  'white-outlined-loading': Colors.BLACK,
  'white-outlined-normal': Colors.BLACK,
}

const textColorsHover: ColorsByCombination = {
  ...textColors,
  'black-bare-active': Colors.GREY_700,
  'black-bare-disabled': Colors.GREY_500,
  'black-bare-loading': Colors.BLACK,
  'black-bare-normal': Colors.GREY_700,
  'red-bare-active': Colors.RED_400,
  'red-bare-disabled': Colors.RED_200,
  'red-bare-loading': Colors.RED_400,
  'red-bare-normal': Colors.RED_400,
  'teal-bare-active': Colors.GREY_700,
  'teal-bare-disabled': Colors.GREY_500,
  'teal-bare-loading': Colors.BLACK,
  'teal-bare-normal': Colors.GREY_700,
  'white-bare-active': Colors.GREY_700,
  'white-bare-disabled': Colors.GREY_500,
  'white-bare-loading': Colors.BLACK,
  'white-bare-normal': Colors.GREY_700,
}

const svgIconsColor: ColorsByCombination = {
  'black-bare-active': Colors.GREY_700,
  'black-bare-disabled': Colors.GREY_500,
  'black-bare-loading': Colors.BLACK,
  'black-bare-normal': Colors.BLACK,
  'black-filled-active': Colors.WHITE,
  'black-filled-disabled': Colors.GREY_500,
  'black-filled-loading': Colors.WHITE,
  'black-filled-normal': Colors.WHITE,
  'black-outlined-active': Colors.GREY_700,
  'black-outlined-disabled': Colors.GREY_500,
  'black-outlined-loading': Colors.BLACK,
  'black-outlined-normal': Colors.BLACK,
  'red-bare-active': Colors.RED_400,
  'red-bare-disabled': Colors.RED_200,
  'red-bare-loading': Colors.RED_500,
  'red-bare-normal': Colors.RED_500,
  'red-filled-active': Colors.WHITE,
  'red-filled-disabled': Colors.WHITE,
  'red-filled-loading': Colors.WHITE,
  'red-filled-normal': Colors.WHITE,
  'red-outlined-active': Colors.RED_400,
  'red-outlined-disabled': Colors.RED_200,
  'red-outlined-loading': Colors.RED_500,
  'red-outlined-normal': Colors.RED_500,
  'teal-bare-active': Colors.GREY_700,
  'teal-bare-disabled': Colors.GREY_500,
  'teal-bare-loading': Colors.BLACK,
  'teal-bare-normal': Colors.BLACK,
  'teal-filled-active': Colors.GREY_700,
  'teal-filled-disabled': Colors.GREY_700,
  'teal-filled-loading': Colors.BLACK,
  'teal-filled-normal': Colors.BLACK,
  'teal-outlined-active': Colors.GREY_700,
  'teal-outlined-disabled': Colors.GREY_700,
  'teal-outlined-loading': Colors.BLACK,
  'teal-outlined-normal': Colors.BLACK,
  'white-bare-active': Colors.GREY_700,
  'white-bare-disabled': Colors.GREY_500,
  'white-bare-loading': Colors.BLACK,
  'white-bare-normal': Colors.BLACK,
  'white-filled-active': Colors.WHITE,
  'white-filled-disabled': Colors.GREY_500,
  'white-filled-loading': Colors.WHITE,
  'white-filled-normal': Colors.WHITE,
  'white-outlined-active': Colors.GREY_700,
  'white-outlined-disabled': Colors.GREY_500,
  'white-outlined-loading': Colors.BLACK,
  'white-outlined-normal': Colors.BLACK,
}

const svgIconsColorHover: ColorsByCombination = {
  ...svgIconsColor,
  'black-bare-active': Colors.GREY_700,
  'black-bare-disabled': Colors.GREY_500,
  'black-bare-loading': Colors.GREY_700,
  'black-bare-normal': Colors.GREY_700,
  'red-bare-active': Colors.RED_400,
  'red-bare-disabled': Colors.RED_200,
  'red-bare-loading': Colors.RED_400,
  'red-bare-normal': Colors.RED_400,
  'teal-bare-active': Colors.GREY_700,
  'teal-bare-disabled': Colors.GREY_500,
  'teal-bare-loading': Colors.GREY_700,
  'teal-bare-normal': Colors.GREY_700,
}

const StyledText = styled.span.withConfig({
  shouldForwardProp: prop => !['color', 'state', 'variant', 'size', 'isCenter', 'isFullWidth', 'iconTypeCenter', 'iconTypeLeft', 'iconTypeRight'].includes(prop),
})<StyledProps>`
  ${({
    color = 'black',
    state,
    variant = 'filled',
    size = 'medium',
  }: StyledProps) => css`
    color: ${textColors[`${color}-${variant}-${state}`]};
    font-size: ${sizeMapping[size].fontSize}px;
    line-height: ${sizeMapping[size].lineHeight}px;
    text-align: center;
  `}
`

const StyledIconWrapper = styled.div.withConfig({
  shouldForwardProp: prop => !['color', 'state', 'variant', 'size', 'isCenter', 'isFullWidth', 'iconTypeCenter', 'iconTypeLeft', 'iconTypeRight', 'iconType', 'position'].includes(prop),
})<
  StyledProps & {
    iconType:
      | keyof typeof Icons
      | React.ComponentType<Record<string, unknown>>
      | ReactNode
    position: 'left' | 'right' | 'center'
  }
>`
  display: flex;

  ${({
    position,
  }: StyledProps & {
    iconType:
      | keyof typeof Icons
      | React.ComponentType<Record<string, unknown>>
      | ReactNode
    position: 'left' | 'right' | 'center'
  }) =>
    position === 'left' &&
    css`
      margin-right: 8px;
    `}
  ${({
    position,
  }: StyledProps & {
    iconType:
      | keyof typeof Icons
      | React.ComponentType<Record<string, unknown>>
      | ReactNode
    position: 'left' | 'right' | 'center'
  }) =>
    position === 'right' &&
    css`
      margin-left: 8px;
    `}
  svg {
    path {
      ${({
        color = 'black',
        variant = 'filled',
        state = 'active',
        iconType,
      }: StyledProps & {
        iconType:
          | keyof typeof Icons
          | React.ComponentType<Record<string, unknown>>
          | ReactNode
      }) =>
        iconType === 'Trophy'
          ? `stroke: ${svgIconsColor[`${color}-${variant}-${state}`]}`
          : `fill: ${svgIconsColor[`${color}-${variant}-${state}`]}`};
    }

    rect {
      fill: ${({
        color = 'black',
        variant = 'filled',
        state = 'active',
      }: StyledProps) => `${svgIconsColor[`${color}-${variant}-${state}`]}`};
    }
  }
`

const ButtonSpinner = styled.div<{ size: number }>`
  position: absolute;
  left: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10px;
  height: 10px;

  span {
    margin: 0 !important;
  }

  div {
    margin: 0 !important;
  }
`

const ButtonStyles = styled.button.withConfig({
  shouldForwardProp: prop => !['color', 'state', 'variant', 'size', 'isCenter', 'isFullWidth', 'iconTypeCenter', 'iconTypeLeft', 'iconTypeRight'].includes(prop),
})<StyledProps>`
  ${SharedButtonFontStyles};
  background-color: ${({
    color = 'black',
    variant = 'filled',
    state,
  }: StyledProps) => `${backgroundColors[`${color}-${variant}-${state}`]}`};
  border: 1px solid
    ${({ color, variant, state }: StyledProps) =>
      `${borderColors[`${color}-${variant}-${state}`]}`};
  width: auto;
  height: ${({ size = 'medium' }: StyledProps) =>
    `${sizeMapping[size].height}px`};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  transition:
    border 150ms ease,
    background 150ms ease;
  position: relative;
  border-radius: 5px;
  padding: 0 24px;

  ${({ iconTypeCenter, size = 'medium' }: StyledProps) => {
    return (
      !!iconTypeCenter &&
      css`
        padding: 0;
        width: ${sizeMapping[size].height}px;
        height: ${sizeMapping[size].height}px;

        @media (min-width: 600px) {
          width: ${sizeMapping[size].height}px;
          height: ${sizeMapping[size].height}px;
        }
      `
    )
  }};

  &:hover {
    background-color: ${({
      color = 'black',
      variant = 'filled',
      state,
    }: StyledProps) =>
      `${backgroundColorsHover[`${color}-${variant}-${state}`]}`};
    border: 1px solid
      ${({ color, variant, state }: StyledProps) =>
        `${borderColorsHover[`${color}-${variant}-${state}`]}`};

    ${StyledText} {
      ${({ color = 'black', state, variant = 'filled' }: StyledProps) => css`
        color: ${textColorsHover[`${color}-${variant}-${state}`]};
      `}
    }

    svg {
      path {
        ${({
          color = 'black',
          variant = 'filled',
          state = 'active',
          iconType,
        }: StyledProps & {
          iconType?:
            | keyof typeof Icons
            | React.ComponentType<Record<string, unknown>>
            | ReactNode
        }) =>
          iconType === 'Trophy'
            ? `stroke: ${svgIconsColorHover[`${color}-${variant}-${state}`]}`
            : `fill: ${svgIconsColorHover[`${color}-${variant}-${state}`]}`};
      }

      rect {
        fill: ${({
          color = 'black',
          variant = 'filled',
          state = 'active',
        }: StyledProps) =>
          `${svgIconsColorHover[`${color}-${variant}-${state}`]}`};
      }
    }
  }

  &:disabled {
    pointer-events: none;
    cursor: not-allowed;
  }

  &:focus-visible {
    border: 2px solid ${Colors.BLACK};
    &:after {
      content: '';
      width: ${({ variant }: StyledProps) =>
        variant === 'filled' ? 'calc(100% - 4px)' : 'calc(100% - 8px)'};
      height: ${({ variant }: StyledProps) =>
        variant === 'filled' ? 'calc(100% - 4px)' : 'calc(100% - 8px)'};
      border-radius: 4px;
      border: 2px solid
        ${({ color, variant, state }: StyledProps) =>
          variant === 'filled'
            ? `${Colors.WHITE}`
            : `${borderColors[`${color}-${variant}-${state}`]}`};
      position: absolute;
    }
  }

  ${({ isCenter }: StyledProps) =>
    isCenter &&
    css`
      margin-left: auto;
      margin-right: auto;
    `}

  ${({ isFullWidth }: StyledProps) =>
    isFullWidth &&
    css`
      width: 100%;
    `}
`

export interface ButtonProps extends ButtonHTMLAttributes<{}> {
  color?: Color
  disabled?: boolean
  isActive?: boolean
  isCenter?: boolean
  isFullWidth?: boolean
  isLoading?: boolean
  /** When true (default), hides the button text and shows only a spinner when loading.
   * When false, shows the spinner to the left of the text when loading.
   * Use false when the button is large enough to accommodate both spinner and text. */
  hideTextWhileLoading?: boolean
  variant?: Variant
  size?: Size
  iconTypeRight?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | ReactNode
  iconTypeLeft?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | ReactNode
  iconTypeCenter?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | ReactNode
}

const ButtonBase: React.FunctionComponent<ButtonProps> = ({
  children,
  color = 'black',
  disabled = false,
  isActive = false,
  isCenter = false,
  isFullWidth = false,
  isLoading = false,
  hideTextWhileLoading = true,
  iconTypeLeft,
  iconTypeRight,
  iconTypeCenter,
  onClick,
  size = 'medium',
  variant = 'filled',
  ...rest
}) => {
  let state
  if (isActive) state = 'active'
  else if (disabled) state = 'disabled'
  else if (isLoading) state = 'loading'
  else state = 'normal'

  const IconRight = (() => {
    if (!iconTypeRight) return null
    if (React.isValidElement(iconTypeRight)) return iconTypeRight
    return typeof iconTypeRight === 'string'
      ? Icons[iconTypeRight]
      : iconTypeRight
  })()

  const IconLeft = (() => {
    if (!iconTypeLeft) return null
    if (React.isValidElement(iconTypeLeft)) return iconTypeLeft
    return typeof iconTypeLeft === 'string' ? Icons[iconTypeLeft] : iconTypeLeft
  })()

  const IconCenter = (() => {
    if (!iconTypeCenter) return null
    if (React.isValidElement(iconTypeCenter)) return iconTypeCenter
    return typeof iconTypeCenter === 'string'
      ? Icons[iconTypeCenter]
      : iconTypeCenter
  })()

  return (
    <ButtonStyles
      color={color}
      disabled={disabled}
      isCenter={isCenter}
      isFullWidth={isFullWidth}
      onClick={e => {
        if (isLoading || disabled) return
        onClick && onClick(e)
      }}
      state={state}
      variant={variant}
      size={size}
      iconTypeCenter={iconTypeCenter}
      {...rest}
    >
      {state !== 'loading' &&
        (IconCenter ? (
          <StyledIconWrapper
            position="center"
            color={color}
            variant={variant}
            state={state}
            iconType={iconTypeCenter}
          >
            {React.isValidElement(IconCenter) ? (
              IconCenter
            ) : (
              <IconCenter
                height={sizeMapping[size].svgSize}
                width={sizeMapping[size].svgSize}
              />
            )}
          </StyledIconWrapper>
        ) : (
          <>
            {IconLeft && (
              <StyledIconWrapper
                position="left"
                color={color}
                variant={variant}
                state={state}
                iconType={iconTypeLeft}
              >
                {React.isValidElement(IconLeft) ? (
                  IconLeft
                ) : (
                  <IconLeft
                    height={sizeMapping[size].svgSize}
                    width={sizeMapping[size].svgSize}
                  />
                )}
              </StyledIconWrapper>
            )}
            <StyledText
              color={color}
              variant={variant}
              state={state}
              size={size}
            >
              {children}
            </StyledText>
            {IconRight && (
              <StyledIconWrapper
                position="right"
                color={color}
                variant={variant}
                state={state}
                iconType={iconTypeRight}
              >
                {React.isValidElement(IconRight) ? (
                  IconRight
                ) : (
                  <IconRight
                    height={sizeMapping[size].svgSize}
                    width={sizeMapping[size].svgSize}
                  />
                )}
              </StyledIconWrapper>
            )}
          </>
        ))}
      {state === 'loading' && hideTextWhileLoading && (
        <Spinner
          color={color === 'black' ? Colors.TEAL_500 : Colors.GREY_400}
        />
      )}
      {state === 'loading' && !hideTextWhileLoading && (
        <>
          <ButtonSpinner size={12}>
            <Spinner
              color={color === 'black' ? Colors.TEAL_500 : Colors.GREY_400}
              size={12}
            />
          </ButtonSpinner>
          <StyledText color={color} variant={variant} state={state} size={size}>
            {children}
          </StyledText>
          {IconRight && (
            <div style={{ position: 'absolute', right: '24px' }}>
              <StyledIconWrapper
                position="right"
                color={color}
                variant={variant}
                state={state}
                iconType={iconTypeRight}
              >
                {React.isValidElement(IconRight) ? (
                  IconRight
                ) : (
                  <IconRight
                    height={sizeMapping[size].svgSize}
                    width={sizeMapping[size].svgSize}
                  />
                )}
              </StyledIconWrapper>
            </div>
          )}
        </>
      )}
    </ButtonStyles>
  )
}

export const Button = memo(ButtonBase)
