import React, { memo } from 'react'
import styled from 'styled-components'

import { Colors } from '../../foundations'
import { SpacerValue } from '../../layouts'
import { Paragraph } from '../Typography'

const radioSizes = {
  large: `${SpacerValue(8)}`,
  medium: `${SpacerValue(7)}`,
  small: `${SpacerValue(6)}`,
  xsmall: `${SpacerValue(5)}`,
}
const radioSizeContainer = {
  large: `${SpacerValue(9)}`,
  medium: `${SpacerValue(8)}`,
  small: `${SpacerValue(7)}`,
  xsmall: `${SpacerValue(6)}`,
}

type InputSize = 'xsmall' | 'small' | 'medium' | 'large'

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
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
const StyledRadio = styled.div.withConfig({
  shouldForwardProp: prop => !['checked', 'disabled', 'inputSize'].includes(prop),
})<{
  checked?: boolean
  disabled?: boolean
  inputSize: InputSize
}>`
  box-sizing: border-box;
  background: ${props => {
    if (props.disabled && !props.checked) return Colors.GREY_100
    else if (props.disabled && props.checked) return Colors.GREY_200
    else if (props.checked) return Colors.GREY_900
    else return Colors.WHITE
  }};
  width: ${props => `${radioSizes[props.inputSize]}px`};
  height: ${props => `${radioSizes[props.inputSize]}px`};
  border-radius: 50%;
  border: 2px solid
    ${props => {
      if (props.disabled) return Colors.GREY_200
      else if (props.checked) return Colors.GREY_900
      else return Colors.GREY_200
    }};
  transition: all 150ms;
  display: flex;
  align-items: center;
  justify-content: center;
  ${StyledIconWrapper} {
    width: 100%;
    display: flex;
    align-items: center;
    height: 100%;
    border: 2px solid
      ${props => {
        if (props.disabled && !props.checked) return Colors.GREY_100
        else if (props.disabled && props.checked) return Colors.WHITE
        else if (!props.disabled && props.checked) return Colors.WHITE
        else return Colors.WHITE
      }};

    justify-content: center;
    border-radius: 50%;
    background: ${props => {
      if (props.disabled) return Colors.GREY_200
      else if (props.checked) return Colors.GREY_900
      else return Colors.WHITE
    }};
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
  }
`

const RadioContainer = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'inputSize',
})<{ inputSize: InputSize }>`
  display: inline-block;
  cursor: pointer;
  padding: 4px;
  position: relative;
  input:focus-visible + label {
    div::before {
      border: 2px solid ${Colors.GREY_900};
      border-radius: 50%;
      content: '';
      width: ${props => `${radioSizeContainer[props.inputSize]}px`};
      height: ${props => `${radioSizeContainer[props.inputSize]}px`};
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
    margin-left: ${SpacerValue(2)}px;
  }
`

export interface InputRadioProps extends React.InputHTMLAttributes<{}> {
  label?: string
  className?: string
  inputSize?: InputSize
}

const InputRadioBase: React.FunctionComponent<InputRadioProps> = ({
  inputSize = 'medium',
  label,
  checked,
  disabled,
  id,
  onChange,
  onClick,
  ...rest
}) => {
  return (
    <RadioContainer inputSize={inputSize}>
      <HiddenRadio
        checked={checked}
        disabled={disabled}
        id={id || (label ? label.split(' ').join('-') : '')}
        onChange={onChange ?? (onClick as React.ChangeEventHandler<HTMLInputElement> | undefined) ?? (() => {})}
        onClick={onChange ? onClick : undefined}
        {...rest}
      />

      <Label htmlFor={id || (label ? label.split(' ').join('-') : '')}>
        <StyledRadio
          checked={checked}
          disabled={disabled}
          inputSize={inputSize}
        >
          <StyledIconWrapper />
        </StyledRadio>
        <Paragraph
          size={inputSize}
          fontWeight="semi-bold"
          color={disabled ? Colors.GREY_500 : Colors.BLACK}
        >
          {label}
        </Paragraph>
      </Label>
    </RadioContainer>
  )
}
export const InputRadio = memo(InputRadioBase)
