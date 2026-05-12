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
const createArray = (n: number) => gridArr.slice(0, n)

export const Column = argTypes => (
  <GridComponent
    minRowHeight="100px"
    style={{ background: `${Colors.TEAL_500}`, padding: '30px' }}
  >
    {createArray(Array.isArray(argTypes.width) ? 12 : 12 / argTypes.width).map(
      n => (
        <Col
          key={n}
          width={argTypes.width}
          style={{ background: `${Colors.WHITE}` }}
          middle={argTypes.middle}
          center={argTypes.center}
        >
          Column {Array.isArray(argTypes.width) ? 'Responsive' : argTypes.width}
        </Col>
      )
    )}
  </GridComponent>
)

const meta: Meta<typeof Column> = {
  argTypes: {
    center: {
      control: {
        options: [true, false],
        type: 'radio',
      },
      defaultValue: false,
      description: 'Controls the horizontal centering of the column',
    },
    middle: {
      control: {
        options: [true, false],
        type: 'radio',
      },
      defaultValue: false,
      description: 'Controls the vertical centering of the column',
    },
    width: {
      control: {
        options: [1, 2, 3, 4, 6, 12, [12, 4, 6, 1]],
        type: 'select',
      },
      defaultValue: 1,
      description:
        'Determines the column width of the column to fit in a 12 column grid. Passing width as an array of sizes [xs, sm, md, lg] will switch between different grid layout columns based on the breakpoints from mobile to desktop.',
    },
  },
  parameters: {
    actions: { disabled: true },
    design: { disabled: true },
    docs: {
      page: () => (
        <CurriStorybookWrapper
          title="Column"
          description=" This is The Column that is used inside a Grid Component. To set the
          width of each column, apply the `width` prop as a number value with
          respect to a 12-column sizing. Provided are props to customize the
          `Column` component"
        >
          <Heading size="h5" as="h2">
            Column Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Column Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Layouts/Grid/Column',
}

export default meta
