import React, { forwardRef, memo, useState } from 'react'
import styled, { css, CSSObject } from 'styled-components'

import { Colors, SpacerValue } from '../..'
import { Icons } from '../Icons'

type InputTypes =
  | 'email'
  | 'file'
  | 'month'
  | 'number'
  | 'password'
  | 'submit'
  | 'text'
  | 'time'
  | 'week'

type Size = 'large' | 'medium' | 'small' | 'xsmall'

const IconWrapperLeft = styled.div`
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  svg {
    path {
      fill: ${Colors.GREY_400};
    }
    rect {
      fill: ${Colors.GREY_400};
    }
  }
`
const IconWrapperRight = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;

  &:hover {
    svg {
      path {
        fill: ${Colors.BLACK};
      }
      rect {
        fill: ${Colors.BLACK};
      }
    }
  }

  svg {
    path {
      fill: ${Colors.GREY_400};
    }
    rect {
      fill: ${Colors.GREY_400};
    }
  }
`

const TextWrapperRight = styled.div`
  background-color: transparent;
  position: absolute;
  right: 4px;
  bottom: 0px;
  z-index: 1;
`
const TextWrapperLeft = styled.div`
  background-color: transparent;
  position: absolute;
  left: 5px;
  transform: translateY(40%);
  bottom: 8px;
  z-index: 1;
`

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

const inputSizes = {
  large: {
    fontSize: 18,
    height: 56,
    labelFontSize: 14,
    lineHeight: 28,
    svgSize: 20,
  },

  medium: {
    fontSize: 16,
    height: 48,
    labelFontSize: 12,
    lineHeight: 24,
    svgSize: 20,
  },

  small: {
    fontSize: 14,
    height: 40,
    labelFontSize: 11,
    lineHeight: 20,
    svgSize: 16,
  },

  xsmall: {
    fontSize: 12,
    height: 32,
    labelFontSize: 10,
    lineHeight: 20,
    svgSize: 12,
  },
}

const Label = styled.label.withConfig({
  shouldForwardProp: prop => !['inputSize', 'labelStyles'].includes(prop),
})<{
  inputSize?: Size
  labelStyles?: React.CSSProperties
}>`
  position: relative;
  font-size: ${({ inputSize = 'large' }: StyledInputProps) => {
    return `${inputSizes[inputSize].labelFontSize}px`
  }};

  line-height: ${({ inputSize = 'large' }: StyledInputProps) => {
    return `${inputSizes[inputSize].lineHeight}px`
  }};

  color: ${Colors.GREY_900};
  font-weight: 500;
  padding: 0;
  margin-bottom: ${SpacerValue(1)}px;
  text-transform: uppercase;
  letter-spacing: 0.02em;

  ${({ labelStyles }) => labelStyles && css(labelStyles as CSSObject)}
`

const inputStyles = css`
  font-family: 'Inter';
  width: 100%;
  position: relative;
  outline: none;
  border: 1px solid ${Colors.GREY_500};
  color: black;
  padding: 0 5px;
  transition: border 0.25s ease;
  border-radius: 4px;
  font-weight: 400;
  -webkit-appearance: none;
  appearance: none;
  background: ${Colors.WHITE};
  box-sizing: border-box;

  &:placeholder {
    color: ${Colors.GREY_500};
  }

  &:focus {
    border: 2px solid ${Colors.BLACK};
  }
`

interface StyledInputProps {
  inError?: boolean
  inWarning?: boolean
  disabled?: boolean
  centered?: boolean
  hasLeftIcon?: boolean
  hasRightIcon?: boolean
  inputSize?: Size
  height?: number
}

const StyledInput = styled.input.withConfig({
  shouldForwardProp: prop => !['inError', 'centered', 'hasLeftIcon', 'hasRightIcon', 'inputSize', 'height'].includes(prop),
})<StyledInputProps>`
  ${inputStyles}
  font-size: ${({ inputSize = 'large' }) => {
    return `${inputSizes[inputSize].fontSize}px`
  }};

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }

  line-height: ${({ inputSize = 'large' }) => {
    return `${inputSizes[inputSize].lineHeight}px`
  }};

  height: ${({ inputSize = 'large', height }) => {
    return height ? `${height}px` : `${inputSizes[inputSize].height}px`
  }};

  ${({ hasLeftIcon }) =>
    hasLeftIcon ? 'padding-left: 30px;' : 'padding-left: 13px;'}

  ${({ hasRightIcon }) =>
    hasRightIcon ? 'padding-right: 36px;' : 'padding-right: 13px;'}

  ${({ centered }) => (centered ? `text-align: center;` : '')}

  ${({ disabled }) =>
    disabled
      ? `
      color: ${Colors.GREY_500} !important;
      background-color: ${Colors.GREY_100} !important;
      border: 1px solid ${Colors.TRANSPARENT};
      opacity: 0.75;
    `
      : ''}

  ${({ disabled, inError, inWarning }) =>
    !disabled && !inError && !inWarning
      ? `
      &:hover,
      &:active {
        border: 1px solid ${Colors.BLACK};
      }
      &:focus {
        border: 2px solid ${Colors.BLACK};
      }
    `
      : ''}

  ${({ inError }) =>
    inError &&
    css`
      color: ${Colors.RED_500};
      border-color: ${Colors.RED_500};
      &:hover,
      &:active {
        border-color: ${Colors.RED_500};
      }
      &:focus {
        color: ${Colors.BLACK};
        border-color: ${Colors.RED_300};
      }
    `}

  ${({ inWarning, inError }) =>
    inWarning &&
    !inError &&
    css`
      color: ${Colors.YELLOW_600};
      border-color: ${Colors.YELLOW_600};
      &:hover,
      &:active {
        border-color: ${Colors.YELLOW_600};
      }
      &:focus {
        color: ${Colors.BLACK};
        border-color: ${Colors.YELLOW_500};
      }
    `}
`
const StyledTextArea = styled.textarea.withConfig({
  shouldForwardProp: prop => !['inError', 'centered', 'hasLeftIcon', 'hasRightIcon', 'inputSize', 'height'].includes(prop),
})<StyledInputProps>`
  ${inputStyles}
  padding: ${({ inputSize }) => {
    return `${inputSize ? '9px' : '14px 16px'}`
  }};
  height: ${({ height }) => (height ? `${height}px` : '70px')};
  resize: vertical;
  border: 1px solid ${Colors.GREY_500};

  font-size: ${({ inputSize = 'large' }) => {
    return `${inputSizes[inputSize].fontSize}px`
  }};

  @media only screen and (max-width: 600px) {
    font-size: 16px;
  }

  line-height: ${({ inputSize = 'large' }) => {
    return `${inputSizes[inputSize].lineHeight}px`
  }};

  ${({ disabled }) =>
    disabled
      ? `
      color: ${Colors.GREY_500} !important;
      background-color: ${Colors.GREY_100} !important;
      border: 1px solid ${Colors.TRANSPARENT};
      opacity: 0.75;
    `
      : ''}

  ${({ disabled, inError, inWarning }) =>
    !disabled && !inError && !inWarning
      ? `
      &:hover,
      &:active {
        border: 1px solid ${Colors.BLACK};
      }
    `
      : ''}

  &:placeholder {
    color: ${Colors.GREY_500};
  }

  &:focus {
    border: 2px solid ${Colors.BLACK};
  }

  ${({ inError }) =>
    inError &&
    css`
      color: ${Colors.RED_500};
      border-color: ${Colors.RED_500};
    `}

  ${({ inWarning, inError }) =>
    inWarning &&
    !inError &&
    css`
      color: ${Colors.YELLOW_600};
      border-color: ${Colors.YELLOW_600};
      &:hover,
      &:active {
        border-color: ${Colors.YELLOW_600};
      }
      &:focus {
        color: ${Colors.BLACK};
        border-color: ${Colors.YELLOW_500};
      }
    `}
`

interface InputWrapperProps {
  wrapperFor?: 'Textarea' | 'Input'
}

const InputWrapper = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'wrapperFor',
})<InputWrapperProps>`
  width: 100%;
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;

  ${({ wrapperFor }) =>
    wrapperFor === 'Textarea'
      ? `height: auto;
      `
      : ``}
`

const Message = styled.label.withConfig({
  shouldForwardProp: prop => prop !== 'inError',
})<StyledInputProps>`
  position: relative;
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  padding-top: ${SpacerValue(1)}px;
  color: ${Colors.GREY_600};

  ${props =>
    props.inError &&
    css`
      color: ${Colors.RED_500};
    `}
`
const InsideMessage = styled.label.withConfig({
  shouldForwardProp: prop => prop !== 'inError',
})<StyledInputProps>`
  background-color: transparent;
  font-size: 9px;
  font-weight: 300;
  text-transform: uppercase;
  color: ${Colors.GREY_600};

  ${props =>
    props.inError &&
    css`
      color: ${Colors.RED_500};
    `}
`

export interface InputProps extends React.InputHTMLAttributes<{}> {
  label?: string | React.ReactNode
  labelStyles?: React.CSSProperties
  errorMessage?: string
  inError?: boolean
  inWarning?: boolean
  explanatoryMessage?: string
  as?: 'Textarea' | 'Input'
  htmlFor?: string
  centered?: boolean
  iconTypeRight?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | React.ReactNode
  iconTypeLeft?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
    | React.ReactNode
  insideTextRight?: string
  insideTextLeft?: string
  onRightIconClick?: Function
  type?: InputTypes
  inputSize?: Size
  iconLeftStyles?: React.CSSProperties
  iconRightStyles?: React.CSSProperties
  height?: number
}

export const InputTextBase = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      onBlur,
      onFocus,
      onClick,
      onChange,
      onRightIconClick,
      placeholder,
      label,
      labelStyles,
      maxLength,
      minLength,
      htmlFor,
      inputSize = 'large',
      children,
      name,
      value,
      defaultValue,
      centered,
      inError,
      inWarning,
      errorMessage,
      explanatoryMessage,
      required,
      as,
      iconTypeRight,
      iconTypeLeft,
      insideTextRight,
      insideTextLeft,
      iconRightStyles = {},
      iconLeftStyles = {},
      style = {},
      height,
      ...rest
    },
    ref
  ) => {
    const [isDirty, setIsDirty] = useState(false)
    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
    const showRequiredError = required && isDirty && isEmpty

    const handleBlur = e => {
      setIsDirty(true)
      onBlur && onBlur(e)
    }

    const handleFocus = e => {
      onFocus && onFocus(e)
    }

    const handleChange = e => {
      setIsDirty(true)
      onChange && onChange(e)
    }

    const handleIconClick = e => {
      e.preventDefault()
      onRightIconClick && onRightIconClick()
    }

    const props = {
      centered,
      defaultValue,
      height,
      id:
        htmlFor ||
        (typeof label === 'string' ? label.split(' ').join('-') : ''),
      inError: inError || showRequiredError,
      inWarning: !inError && !showRequiredError && inWarning,
      inputSize,
      maxLength,
      minLength,
      name,
      onBlur: handleBlur,
      onChange: handleChange,
      onClick,
      onFocus: handleFocus,
      placeholder,
      required,
      value,
      ...rest,
    }

    const textAreaProps = {
      centered,
      defaultValue,
      height,
      id:
        htmlFor ||
        (typeof label === 'string' ? label.split(' ').join('-') : ''),
      inError: inError || showRequiredError,
      inWarning: !inError && !showRequiredError && inWarning,
      inputSize,
      maxLength,
      minLength,
      name,
      onBlur: handleBlur,
      onChange: handleChange,
      onClick,
      onFocus: handleFocus,
      placeholder,
      required,
      value,
      ...rest,
    }

    const renderIconRight = () => {
      if (typeof iconTypeRight === 'string') {
        const IconRight = Icons[iconTypeRight as string]
        return (
          <IconRight
            height={inputSizes[inputSize].svgSize}
            width={inputSizes[inputSize].svgSize}
            style={iconRightStyles ? { ...iconRightStyles } : undefined}
          />
        )
      } else if (React.isValidElement(iconTypeRight)) {
        return React.cloneElement(
          iconTypeRight as React.ReactElement<{ style?: React.CSSProperties }>,
          {
            style: {
              ...iconRightStyles,
              height: inputSizes[inputSize].svgSize,
              width: inputSizes[inputSize].svgSize,
            },
          }
        )
      }
      return null
    }

    const renderIconLeft = () => {
      if (typeof iconTypeLeft === 'string') {
        const IconLeft = Icons[iconTypeLeft as string]
        return (
          <IconLeft
            height={inputSizes[inputSize].svgSize}
            width={inputSizes[inputSize].svgSize}
            style={iconLeftStyles ? { ...iconLeftStyles } : undefined}
          />
        )
      } else if (React.isValidElement(iconTypeLeft)) {
        return React.cloneElement(
          iconTypeLeft as React.ReactElement<{ style?: React.CSSProperties }>,
          {
            style: {
              ...iconLeftStyles,
              height: inputSizes[inputSize].svgSize,
              width: inputSizes[inputSize].svgSize,
            },
          }
        )
      }
      return null
    }

    return (
      <InputWrapper wrapperFor={as} style={style}>
        {Boolean(label) && (
          <Label
            inputSize={inputSize}
            labelStyles={labelStyles}
            htmlFor={
              htmlFor ||
              (typeof label === 'string' ? label.split(' ').join('-') : '')
            }
          >
            <div style={{ alignItems: 'center', display: 'flex', gap: 4 }}>
              {label}
              {required && (
                <span style={{ color: Colors.RED_500, fontSize: 12 }}> *</span>
              )}
            </div>
          </Label>
        )}

        {children}

        {as === 'Textarea' && <StyledTextArea {...textAreaProps} />}

        {as !== 'Textarea' && (
          <InputContainer>
            {insideTextLeft && (
              <TextWrapperLeft>
                <InsideMessage>{insideTextLeft}</InsideMessage>
              </TextWrapperLeft>
            )}
            {iconTypeLeft && (
              <IconWrapperLeft>{renderIconLeft()}</IconWrapperLeft>
            )}
            <StyledInput
              {...props}
              ref={ref}
              inputSize={inputSize}
              hasLeftIcon={!!iconTypeLeft}
              hasRightIcon={!!iconTypeRight}
            />
            {iconTypeRight && (
              <IconWrapperRight onClick={handleIconClick}>
                {renderIconRight()}
              </IconWrapperRight>
            )}
            {insideTextRight && (
              <TextWrapperRight>
                <InsideMessage>{insideTextRight}</InsideMessage>
              </TextWrapperRight>
            )}
          </InputContainer>
        )}

        {errorMessage && <Message inError>{errorMessage}</Message>}
        {!errorMessage && explanatoryMessage && (
          <Message>{explanatoryMessage}</Message>
        )}
      </InputWrapper>
    )
  }
)

InputTextBase.displayName = 'InputTextBase'

export const InputText = memo(InputTextBase)
