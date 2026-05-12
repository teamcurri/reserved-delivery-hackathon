import React, { memo } from 'react'
import styled from 'styled-components'

const SPACER_MULTIPLE = 4

type SpacerProps = {
  value: number
}

const SpacerStyle = styled.div<SpacerProps>`
  padding-bottom: ${({ value }) => value * SPACER_MULTIPLE}px;
  height: 1px;
  margin-top: -1px;
`

const SpacerBase: React.FunctionComponent<SpacerProps> = ({ value }) => (
  <SpacerStyle value={value} />
)

/**
 * __Spacer__
 * Create vertical spacing between components.
 * @value is a number value based on multiples of 4

 * @example
 * import { Spacer } from '@curri/ui'
 *
 * <Spacer value={4} /> // pixel spacing of 16px
 */
export const Spacer = memo(SpacerBase)

/**
 * __SpacerValue__
 * Use as a function to return a number values in multiples of 4

 * @example
 * import { SpacerValue } from '@curri/ui'
 *
 * const DivComponent = styled.div`
 *  padding: 0 ${SpacerValue(4)}px; // pixel spacing of 16px
 * `
 *
 */
export const SpacerValue = (value: number) => value * SPACER_MULTIPLE
