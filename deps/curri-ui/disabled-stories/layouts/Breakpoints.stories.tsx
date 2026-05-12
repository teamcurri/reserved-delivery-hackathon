import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { CurriStorybookWrapper } from '../../../disabled-stories/curri-storybook-components'
import {
  breakpointConfig,
  Breakpoints,
  Heading,
  Paragraph,
  Spacer,
} from '../..'

const Documentation = () => (
  <>
    <Heading size="h2" as="h2">
      Breakpoint Configurations
    </Heading>
    <ul>
      <li>
        <code>xsmall:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          Anything below {breakpointConfig.xsmall}px
        </Paragraph>
      </li>
      <li>
        <code>small:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          From {breakpointConfig.xsmall + 1}px to {breakpointConfig.small}px
        </Paragraph>
      </li>
      <li>
        <code>smallOnly:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          Anything under {breakpointConfig.small}px
        </Paragraph>
      </li>
      <li>
        <code>medium:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          From {breakpointConfig.small + 1}px to {breakpointConfig.medium}px
        </Paragraph>
      </li>
      <li>
        <code>mediumAndUp:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          Anything from {breakpointConfig.small + 1}px and up
        </Paragraph>
      </li>
      <li>
        <code>large:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          From {breakpointConfig.medium + 1}px to {breakpointConfig.large}px
        </Paragraph>
      </li>
      <li>
        <code>xlarge:</code>
        <Paragraph
          size="small"
          display="inline-block"
          style={{ marginLeft: '5px' }}
        >
          Anything from {breakpointConfig.large + 1}px
        </Paragraph>
      </li>
    </ul>
  </>
)

export const Default = argTypes => (
  <Breakpoints size={argTypes.size}>
    Breakpoint Size: <b>{argTypes.size}</b>
  </Breakpoints>
)

const meta: Meta<typeof Default> = {
  argTypes: {
    size: {
      control: {
        options: [
          'xsmall',
          'small',
          'smallOnly',
          'medium',
          'mediumAndUp',
          'large',
          'xlarge',
        ],
        type: 'radio',
      },
      defaultValue: 'xlarge',
    },
  },
  component: Breakpoints,
  parameters: {
    actions: { disabled: true },
    design: { disabled: true },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <>
          <CurriStorybookWrapper
            title="Breakpoints"
            description="To See Breakpoints in action, resize the window to see the display at
          work."
          >
            <Documentation />
            <Spacer value={30} />
            <Heading size="h5" as="h2">
              Breakpoints Sandbox
            </Heading>
            <Primary />
            <Heading size="h5" as="h2">
              Breakpoints Props
            </Heading>
            {/* <ArgsTable story={PRIMARY_STORY} /> */}
          </CurriStorybookWrapper>
        </>
      ),
    },
  },
  title: 'Layouts/Breakpoints',
}

export default meta
