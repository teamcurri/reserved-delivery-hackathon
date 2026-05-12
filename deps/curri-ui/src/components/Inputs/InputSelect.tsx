import React, { memo } from 'react'
import styled, { css } from 'styled-components'

import { Colors, SpacerValue } from '../..'
import { Icons } from '../Icons'

type Size = 'large' | 'medium' | 'small' | 'xsmall'

interface SingleSelectType {
  text: string
  value: string
  selected?: boolean
  disabled?: boolean
}

interface MultiOptionGroupType {
  optionGroupLabel: string
  optionGroupData: SingleSelectType[]
}

const IconWrapperLeft = styled.div`
  position: absolute;
  left: 10px;
  transform: translateY(-50%);
  top: 55%;
  cursor: pointer;
  z-index: 1;

  svg {
    path {
      fill: ${Colors.GREY_300};
    }
    rect {
      fill: ${Colors.GREY_300};
    }
  }
`
const IconWrapperRight = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'inputSize',
})<{ inputSize?: Size }>`
  position: absolute;
  right: 15px;
  transform: translateY(-50%);
  top: ${({ inputSize = 'large' }: StyledSelectProps) => {
    return `${inputSizes[inputSize].svgPlacement}%`
  }};
  cursor: pointer;
  pointer-events: none;
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
      fill: ${Colors.GREY_900};
    }
    rect {
      fill: ${Colors.GREY_900};
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
    svgPlacement: 58,
    svgSize: 18,
  },

  medium: {
    fontSize: 16,
    height: 48,
    labelFontSize: 12,
    lineHeight: 24,
    svgPlacement: 58,
    svgSize: 16,
  },

  small: {
    fontSize: 14,
    height: 40,
    labelFontSize: 11,
    lineHeight: 20,
    svgPlacement: 56,
    svgSize: 14,
  },

  xsmall: {
    fontSize: 12,
    height: 32,
    labelFontSize: 10,
    lineHeight: 20,
    svgPlacement: 54,
    svgSize: 12,
  },
}

const Label = styled.label.withConfig({
  shouldForwardProp: prop => prop !== 'inputSize',
})<{ inputSize?: Size }>`
  position: relative;
  font-size: ${({ inputSize = 'large' }: StyledSelectProps) => {
    return `${inputSizes[inputSize].labelFontSize}px`
  }};

  line-height: ${({ inputSize = 'large' }: StyledSelectProps) => {
    return `${inputSizes[inputSize].lineHeight}px`
  }};

  color: ${Colors.GREY_900};
  font-weight: 500;
  padding: 0;
  margin-bottom: ${SpacerValue(2)}px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
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
  background: ${Colors.WHITE};
  box-sizing: border-box;

  &:hover,
  &:active {
    border: 1px solid ${Colors.BLACK};
  }

  &:focus {
    border: 2px solid ${Colors.BLACK};
  }
`

interface StyledSelectProps {
  inError?: boolean
  inWarning?: boolean
  disabled?: boolean
  centered?: boolean
  hasLeftIcon?: boolean
  hasRightIcon?: boolean
  inputSize?: Size
}

const StyledSelect = styled.select.withConfig({
  shouldForwardProp: prop => !['inError', 'centered', 'hasLeftIcon', 'hasRightIcon', 'inputSize'].includes(prop),
})<StyledSelectProps>`
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

  height: ${({ inputSize = 'large' }) => {
    return `${inputSizes[inputSize].height}px`
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

      &:hover,
      &:active {
        border: 1px solid ${Colors.TRANSPARENT};
      }
    `
      : ''}



  ${props =>
    props.inError &&
    css`
      color: ${Colors.RED_500};
      border-color: ${Colors.RED_500};
      &:focus {
        color: ${Colors.BLACK};
        border-color: ${Colors.RED_300};
      }
    `}

  ${props =>
    props.inWarning &&
    !props.inError &&
    css`
      border-color: ${Colors.YELLOW_600};
      &:hover,
      &:active {
        border-color: ${Colors.YELLOW_600};
      }
      &:focus {
        border-color: ${Colors.YELLOW_500};
      }
    `}
`

const StyledMultiOptionGroup = styled.select.withConfig({
  shouldForwardProp: prop => !['inError', 'centered', 'hasLeftIcon', 'hasRightIcon', 'inputSize'].includes(prop),
})<StyledSelectProps>`
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

  height: ${({ inputSize = 'large' }) => {
    return `${inputSizes[inputSize].height}px`
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

      &:hover,
      &:active {
        border: 1px solid ${Colors.TRANSPARENT};
      }
    `
      : ''}



  ${(props: StyledSelectProps) =>
    props.inError &&
    css`
      color: ${Colors.RED_500};
      border-color: ${Colors.RED_500};
      &:focus {
        color: ${Colors.BLACK};
        border-color: ${Colors.RED_300};
      }
    `}

  ${(props: StyledSelectProps) =>
    props.inWarning &&
    !props.inError &&
    css`
      border-color: ${Colors.YELLOW_600};
      &:hover,
      &:active {
        border-color: ${Colors.YELLOW_600};
      }
      &:focus {
        border-color: ${Colors.YELLOW_500};
      }
    `}
`

interface InputWrapperProps {
  wrapperFor?: 'MultiOptionGroup' | 'SingleSelectGroup'
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
    wrapperFor === 'MultiOptionGroup'
      ? `height: auto;
      `
      : ``}
`

const Message = styled.label.withConfig({
  shouldForwardProp: prop => prop !== 'inError',
})<StyledSelectProps>`
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
})<StyledSelectProps>`
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

export interface SelectProps extends React.InputHTMLAttributes<{}> {
  label?: string
  errorMessage?: string
  inError?: boolean
  inWarning?: boolean
  explanatoryMessage?: string
  as?: 'MultiOptionGroup' | 'SingleSelectGroup'
  id?: string
  centered?: boolean
  iconTypeRight?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
  iconTypeLeft?:
    | keyof typeof Icons
    | React.ComponentType<Record<string, unknown>>
  insideTextRight?: string
  insideTextLeft?: string
  onRightIconClick?: Function
  inputSize?: Size
  options?: SingleSelectType[]
  multiOptionGroup?: MultiOptionGroupType[]
}

export const InputSelectBase: React.FunctionComponent<SelectProps> = ({
  onBlur,
  onFocus,
  onClick,
  onChange,
  onRightIconClick,
  label,
  id,
  inputSize = 'large',
  children,
  options,
  multiOptionGroup,
  name,
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
  style = {},
  ...rest
}) => {
  const handleBlur = e => {
    onBlur && onBlur(e)
  }

  const handleFocus = e => {
    onFocus && onFocus(e)
  }

  const handleChange = e => {
    onChange && onChange(e)
  }

  const handleIconClick = e => {
    e.preventDefault()
    onRightIconClick && onRightIconClick()
  }

  const props = {
    centered,
    id: id || (label ? label.split(' ').join('-') : ''),
    inError,
    inWarning: !inError && inWarning,
    inputSize,
    name,
    onBlur: handleBlur,
    onChange: handleChange,
    onClick,
    onFocus: handleFocus,
    required,
    ...rest,
  }

  const IconRight =
    typeof iconTypeRight === 'string'
      ? Icons[iconTypeRight as string]
      : iconTypeRight

  const IconLeft =
    typeof iconTypeLeft === 'string'
      ? Icons[iconTypeLeft as string]
      : iconTypeLeft

  return (
    <InputWrapper wrapperFor={as} style={style}>
      {Boolean(label) && (
        <Label
          inputSize={inputSize}
          htmlFor={id || (label ? label.split(' ').join('-') : '')}
        >
          {label}
        </Label>
      )}

      {children}

      {as === 'MultiOptionGroup' && (
        <InputContainer>
          {insideTextLeft && (
            <TextWrapperLeft>
              <InsideMessage>{insideTextLeft}</InsideMessage>
            </TextWrapperLeft>
          )}
          {iconTypeLeft && (
            <IconWrapperLeft>
              <IconLeft />
            </IconWrapperLeft>
          )}
          <StyledMultiOptionGroup
            {...props}
            inputSize={inputSize}
            hasLeftIcon={!!iconTypeLeft}
            hasRightIcon={!!iconTypeRight}
            onChange={handleChange}
          >
            {multiOptionGroup?.map(option => {
              return (
                <optgroup
                  key={`option:${option.optionGroupLabel}`}
                  label={option.optionGroupLabel}
                >
                  {option.optionGroupData.map(optionData => (
                    <option
                      key={`optionData:${optionData.value}`}
                      value={optionData?.value}
                      disabled={optionData.disabled}
                    >
                      {optionData?.text}
                    </option>
                  ))}
                </optgroup>
              )
            })}
          </StyledMultiOptionGroup>
          {iconTypeRight && (
            <IconWrapperRight
              inputSize={inputSize}
              className={'minimal'}
              onClick={handleIconClick}
            >
              <IconRight
                height={inputSizes[inputSize].svgSize}
                width={inputSizes[inputSize].svgSize}
              />
            </IconWrapperRight>
          )}
          {insideTextRight && (
            <TextWrapperRight>
              <InsideMessage>{insideTextRight}</InsideMessage>
            </TextWrapperRight>
          )}
        </InputContainer>
      )}

      {as !== 'MultiOptionGroup' && (
        <InputContainer>
          {insideTextLeft && (
            <TextWrapperLeft>
              <InsideMessage>{insideTextLeft}</InsideMessage>
            </TextWrapperLeft>
          )}
          {iconTypeLeft && (
            <IconWrapperLeft>
              <IconLeft />
            </IconWrapperLeft>
          )}
          <StyledSelect
            {...props}
            inputSize={inputSize}
            hasLeftIcon={!!iconTypeLeft}
            hasRightIcon={!!iconTypeRight}
            onChange={handleChange}
          >
            {options?.map(option => {
              return (
                <option
                  key={`option:${option.value}`}
                  value={option?.value}
                  disabled={option?.disabled}
                >
                  {option?.text}
                </option>
              )
            })}
          </StyledSelect>
          {iconTypeRight && (
            <IconWrapperRight
              inputSize={inputSize}
              className={'minimal'}
              onClick={handleIconClick}
            >
              <IconRight
                height={inputSizes[inputSize].svgSize}
                width={inputSizes[inputSize].svgSize}
              />
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
export const InputSelect = memo(InputSelectBase)
