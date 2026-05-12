import React, { memo } from 'react'
import styled from 'styled-components'

import { Colors } from '../../foundations'

const ActualSpinner = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'size' && prop !== 'margin',
})<{ size?: number; margin?: string }>`
  &,
  &:after {
    border-radius: 50%;
    width: ${({ size }) => size || 15}px;
    height: ${({ size }) => size || 15}px;
  }

  margin: ${({ margin }) => margin || '15px'} auto;
  font-size: 15px;
  position: relative;

  border-top: 2px solid rgba(0, 0, 0, 0.1);
  border-right: 2px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  border-left: 2px solid ${({ color }) => color || Colors.TEAL_500};

  transform: translateZ(0);
  animation: spin 0.4s infinite linear;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const SpinnerBase: React.FunctionComponent<{
  color?: string
  className?: string
  size?: number
  spinnerMargin?: string
}> = ({ color, size, spinnerMargin, ...props }) => {
  return (
    <span {...props} data-spinner="1">
      <ActualSpinner color={color} size={size} margin={spinnerMargin} />
    </span>
  )
}

export const Spinner = memo(SpinnerBase)
