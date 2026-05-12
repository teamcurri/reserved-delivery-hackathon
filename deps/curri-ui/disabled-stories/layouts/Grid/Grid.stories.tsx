import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { CurriStorybookWrapper } from '../../../../disabled-stories/curri-storybook-components'
import { Col, Colors, Grid as GridComponent, Heading } from '../../..'

const gridArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
const createArray = (n: number) => {
  const numberColumns = n && n <= 12 ? n : 12
  return gridArr.slice(0, numberColumns)
}

export const Grid = argTypes => (
  <GridComponent
    minRowHeight={argTypes.minRowHeight}
    style={{ background: `${Colors.TEAL_500}`, padding: '30px' }}
    gap={argTypes.gap}
    height={argTypes.height || null}
  >
    {createArray(argTypes.columns).map(n => (
      <Col
        key={n}
        width={
          argTypes.columns && argTypes.columns <= 12
            ? Math.ceil(12 / argTypes.columns)
            : 1
        }
        style={{ background: `${Colors.WHITE}` }}
      >
        Column {n}
      </Col>
    ))}
  </GridComponent>
)

const meta: Meta<typeof Grid> = {
  argTypes: {
    columns: {
      control: { options: gridArr, type: 'select' },
      defaultValue: 12,
      description:
        'Note this is not a prop for Grid. Only displayed to see how you can create a grid with x amount of columns. Sets the Column between 1 - 12 to how columns are creataed.',
    },
    gap: {
      control: { max: 40, min: 0, step: 1, type: 'range' },
      defaultValue: 8,
      description:
        'Sets the gap between the column. Default is 8 if not supplied  (Defined on Grid)',
    },
    height: {
      control: { min: 1, step: 1, type: 'number' },
      defaultValue: 100,
      description: 'Sets height of the Grid',
    },
    minRowHeight: {
      control: { min: 1, step: 1, type: 'number' },
      defaultValue: 100,
      description: 'Sets min height of the Grid',
    },
  },
  parameters: {
    actions: { disabled: true },
    design: { disabled: true },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper
          title="Grid"
          description="This is a Grid system that utilizes the CSS display grid. Max-width of the
          grid is 1440px. This grid is set to use a 12-grid layout. Provided
          are some example props you can pass to customize the Grid."
        >
          <Heading size="h5" as="h2">
            Grid Sandbox
          </Heading>
          <Primary />

          <Heading size="h5" as="h2">
            Grid Props
          </Heading>
          {/* <ArgsTable
            story={PRIMARY_STORY}
            exclude={['center', 'middle', 'width']}
          /> */}
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Layouts/Grid/Grid',
}

export default meta
