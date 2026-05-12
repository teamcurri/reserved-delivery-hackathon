import React, { memo } from 'react'
import styled from 'styled-components'

import { Colors } from '../../foundations'
import { SpacerValue } from '../../layouts'
import { Icons } from '../Icons'
import { Paragraph } from '../Typography'

const checkboxSizes = {
  large: `${SpacerValue(7)}`,
  medium: `${SpacerValue(6)}`,
  small: `${SpacerValue(5)}`,
  xsmall: `${SpacerValue(4)}`,
}
const checkboxSizeContainer = {
  large: `${SpacerValue(8)}`,
  medium: `${SpacerValue(7)}`,
  small: `${SpacerValue(6)}`,
  xsmall: `${SpacerValue(5)}`,
}

type InputSize = 'xsmall' | 'small' | 'medium' | 'large'

const getBackgroundColor = props => {
  return (() => {
    if (props.disabled && !props.checked) {
      return Colors.GREY_100
    }

    if (props.disabled && props.checked) {
      return Colors.GREY_200
    }

    if (props.checked) {
      return Colors.GREY_900
    }

    return Colors.WHITE
  })()
}

const getDefaultBorderColor = props => {
  return (() => {
    if (props.checked && props.disabled) {
      return Colors.GREY_200
    }

    if (props.checked) {
      return Colors.GREY_900
    }

    return Colors.GREY_200
  })()
}

const getStyledIconColors = props => {
  return (() => {
    if (props.disabled) {
      return Colors.GREY_200
    }

    if (props.checked) {
      return Colors.GREY_900
    }

    return Colors.WHITE
  })()
}

const getSvgSizing = props => {
  return (() => {
    if (props.checkboxSize && props.checkboxSize <= 4) {
      return SpacerValue(props.checkboxSize - 1.5)
    }

    if (props.checkboxSize && props.checkboxSize > 4) {
      return SpacerValue(props.checkboxSize - 3)
    }

    return SpacerValue(5)
  })()
}

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
  top: 0;
  left: 0;
  opacity: 0;
`

const StyledIconWrapper = styled.div``
const StyledCheckbox = styled.div.withConfig({
  shouldForwardProp: prop => !['checked', 'disabled', 'inputSize'].includes(prop),
})<{
  checked?: boolean
  disabled?: boolean
  inputSize: InputSize
}>`
  box-sizing: border-box;
  background: ${props => getBackgroundColor(props)};
  width: ${props => `${checkboxSizes[props.inputSize]}px`};
  height: ${props => `${checkboxSizes[props.inputSize]}px`};
  border-radius: 4px;
  border: 2px solid ${props => getDefaultBorderColor(props)};
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  ${StyledIconWrapper} {
    width: 100%;
    display: flex;
    align-items: center;
    height: calc(100% - 4px);
    border: 2px solid ${props => getStyledIconColors(props)};

    justify-content: center;
    border-radius: 4px;
    background: ${props => getStyledIconColors(props)};
    svg {
      width: ${props => getSvgSizing(props)}px;
      height: ${props => getSvgSizing(props)}px;
      path {
        fill: ${Colors.WHITE};
      }
    }
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const CheckboxContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'inputSize' && prop !== 'disabled',
})<{
  inputSize: InputSize
  disabled?: boolean
}>`
  display: inline-block;
  padding: 4px;
  position: relative;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};

  input:focus-visible + label {
    div::before {
      border: 2px solid ${Colors.GREY_900};
      border-radius: 4px;
      content: '';
      width: ${props => `${checkboxSizeContainer[props.inputSize]}px`};
      height: ${props => `${checkboxSizeContainer[props.inputSize]}px`};
      left: -4px;
      position: absolute;
      top: -4px;
    }
  }
`

const Label = styled.label`
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  p {
    margin-left: ${SpacerValue(3)}px;
  }
`

export interface InputCheckboxProps extends React.InputHTMLAttributes<{}> {
  label?: string
  labelFontWeight?: 'medium' | 'regular' | 'semi-bold'
  className?: string
  inputSize?: InputSize
}

const InputCheckboxBase: React.FunctionComponent<InputCheckboxProps> = ({
  label,
  labelFontWeight,
  checked,
  inputSize = 'medium',
  disabled,
  id,
  className,
  onChange,
  onClick,
  ...rest
}) => {
  return (
    <CheckboxContainer
      inputSize={inputSize}
      disabled={disabled}
      className={className}
    >
      <HiddenCheckbox
        checked={checked}
        disabled={disabled}
        id={id || (label ? label.split(' ').join('-') : '')}
        onChange={onChange ?? (onClick as React.ChangeEventHandler<HTMLInputElement> | undefined) ?? (() => {})}
        onClick={onChange ? onClick : undefined}
        {...rest}
      />

      <Label htmlFor={id || (label ? label.split(' ').join('-') : '')}>
        <StyledCheckbox
          checked={checked}
          disabled={disabled}
          inputSize={inputSize}
        >
          <StyledIconWrapper>
            <Icons.Checkmark />
          </StyledIconWrapper>
        </StyledCheckbox>
        {Boolean(label) && (
          <Paragraph
            size={inputSize}
            fontWeight={labelFontWeight || 'semi-bold'}
            color={disabled ? Colors.GREY_500 : Colors.BLACK}
          >
            {label}
          </Paragraph>
        )}
      </Label>
    </CheckboxContainer>
  )
}

export const InputCheckbox = memo(InputCheckboxBase)
