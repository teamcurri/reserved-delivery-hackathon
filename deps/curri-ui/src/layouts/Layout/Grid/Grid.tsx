import React, { FunctionComponent, memo, ReactNode } from 'react'
import styled from 'styled-components'


// https://github.com/azz/styled-css-grid
import { LAYOUT_MAXWIDTH } from '../utils'
type GridComponentProps = {
  children: ReactNode
  className?: string
  columns?: string | number
  gap?: number
  columnGap?: number
  rowGap?: number
  height?: string | number
  minRowHeight?: string
  maxWidth?: number | string
  flow?: string
  rows?: string | number
  areas?: string[]
  justifyContent?: string
  alignContent?: string
  style?: React.CSSProperties
}

const autoRows = ({ minRowHeight = '20px' }) => {
  if (!minRowHeight) return '20px'

  return typeof minRowHeight === 'string'
    ? `minmax(${minRowHeight}, auto)`
    : `minmax(${minRowHeight}px, auto)`
}

const frGetter = value =>
  typeof value === 'number' ? `repeat(${value}, 1fr)` : value

const gap = ({ gap = 8 }) => gap

const flow = ({ flow = 'row' }) => flow

const formatAreas = areas => areas.map(area => `"${area}"`).join(' ')

const GRID_CUSTOM_PROPS = new Set([
  'columns', 'gap', 'columnGap', 'rowGap', 'height', 'minRowHeight',
  'maxWidth', 'flow', 'rows', 'areas', 'justifyContent', 'alignContent',
])

const StyledGrid = styled.div.withConfig({
  shouldForwardProp: prop => !GRID_CUSTOM_PROPS.has(prop),
})<GridComponentProps>`
  display: grid;
  max-width: ${({ maxWidth }) => {
    if (typeof maxWidth === 'string' && maxWidth.includes('%')) return maxWidth
    if (typeof maxWidth === 'number') return `${maxWidth}px`
    return `${LAYOUT_MAXWIDTH}px`
  }};
  margin: 0 auto;
  height: ${({ height = 'auto' }) => {
    if (!height) return 'auto'
    return typeof height === 'string' ? height : `${height}px`
  }};
  grid-auto-flow: ${flow};
  grid-auto-rows: ${autoRows};
  ${({ rows }) => rows && `grid-template-rows: ${frGetter(rows)}`};
  grid-template-columns: ${({ columns = 12 }) => frGetter(columns)};
  grid-gap: ${gap}px;
  ${({ columnGap }) => columnGap && `column-gap: ${columnGap}px`};
  ${({ rowGap }) => rowGap && `row-gap: ${rowGap}px`};
  ${({ areas }) => areas && `grid-template-areas: ${formatAreas(areas)}`};
  ${({ justifyContent }) =>
    justifyContent && `justify-content: ${justifyContent}`};
  ${({ alignContent }) => alignContent && `align-content: ${alignContent}`};
`

const GridBase: FunctionComponent<GridComponentProps> = ({
  children,
  ...rest
}) => {
  return <StyledGrid {...rest}>{children}</StyledGrid>
}

export const Grid = memo(GridBase)
