import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Colors, Heading, Spinner as SpinnerComponent } from '../../..'
import { CurriStorybookWrapper } from '../../curri-storybook-components'

const meta: Meta<typeof Default> = {
  argTypes: {
    className: {
      table: {
        description: true,
        disable: true,
      },
    },
    color: {
      control: {
        type: 'color',
      },
      defaultValue: Colors.TEAL_500,
      description: 'Changes the color of the Button with a hex value',
    },
  },

  component: SpinnerComponent,

  parameters: {
    actions: { disable: true },
    design: { disabled: true },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <>
          <CurriStorybookWrapper
            title="Spinner"
            description="Loading spinner component."
          >
            <Heading size="h5" as="h2">
              Spinner Sandbox
            </Heading>
            <Primary />
            <Heading size="h5" as="h2">
              Spinner Props
            </Heading>
            {/* <ArgsTable story={PRIMARY_STORY} /> */}
          </CurriStorybookWrapper>
        </>
      ),
    },
  },
  title: 'Components/Spinner',
}

export default meta

export const Default = ({
  color,
  className,
}: React.ComponentProps<typeof SpinnerComponent>) => (
  <SpinnerComponent color={color} className={className} />
)
