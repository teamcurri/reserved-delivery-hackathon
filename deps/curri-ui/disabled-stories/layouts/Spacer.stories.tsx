import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
  Source,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Colors, Heading, Paragraph, Spacer, SpacerValue } from '../../src'
import { CurriStorybookWrapper } from '../../src/stories/curri-storybook-components'

const meta: Meta<typeof Default> = {
  argTypes: {
    // className: {
    //   table: {
    //     description: true,
    //     disable: true,
    //   },
    // },
    value: {
      control: {
        type: 'number',
      },
      defaultValue: 8,
      description: 'Determines vertical space between content in pixels',
    },
  },

  component: Spacer,

  parameters: {
    actions: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=193%3A6907',
    },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper
          title="Spacer"
          description="Component that creates vertical space between content."
        >
          <Heading size="h5" as="h2">
            Spacer Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Spacer Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}

          <Heading size="h6" as="h3">
            Additional Spacer Util
          </Heading>
          <Spacer value={2} />
          <Paragraph size="medium">
            You can also utilize <code>SpacerValue(n)</code> to get the px value
            times the standard spacing multiplier of 4.
          </Paragraph>
          <Source
            language="jsx"
            dark
            code={`
// SpacerValue(n: number)
const ComponentDiv = styled.div\`
  margin-left: \${SpacerValue(4)}
\`
            `}
          />
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Layouts/Spacer',
}

export default meta

export const Default = ({ value }) => (
  <div>
    <Paragraph size="medium">This is content</Paragraph>
    <Paragraph
      size="small"
      color={Colors.PURPLE_500}
      style={{ marginLeft: '15px' }}
    >
      Spacer Value = {SpacerValue(value)}px
    </Paragraph>
    <div
      style={{ border: `1px solid ${Colors.PURPLE_500}`, borderRadius: '5px' }}
    >
      <Spacer value={value} />
    </div>
    <Paragraph size="medium">This is content</Paragraph>
  </div>
)
