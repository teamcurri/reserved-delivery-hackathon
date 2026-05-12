import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Heading, Text as ComponentText } from '../../../..'
import { CurriStorybookWrapper } from '../../../curri-storybook-components'

const meta: Meta<typeof ComponentText> = {
  argTypes: {
    align: {
      control: {
        options: ['left', 'center', 'right'],
        type: 'radio',
      },
      defaultValue: 'left',
    },
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is a Text',
      description: 'Child rendering of the text',
    },
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
      defaultValue: '#000',
      description: 'Changes the color of the text.',
    },
    display: {
      control: {
        options: ['block', 'inline-block', 'inline'],
        type: 'select',
      },
      defaultValue: 'block',
    },
    size: {
      control: {
        options: ['sm', 'md', 'lg'],
        type: 'select',
      },
      defaultValue: 'lg',
    },
    style: {
      table: {
        description: true,
        disable: true,
      },
    },
  },
  component: ComponentText,

  parameters: {
    actions: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/d6xgd5aOWFgWEP06mZxi9p/Curri-UI-Guide?node-id=171%3A47',
    },
    docs: {
      page: () => (
        <CurriStorybookWrapper
          title="Text"
          description="Deprecated Text component. Replace `Text` with `Paragraph` component."
        >
          <Heading size="h5" as="h2">
            Text Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Text Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Typography/Deprecated/Text',
}

export default meta

export const Text = ({
  color,
  size,
  align,
  display,
  children,
}: React.ComponentProps<typeof ComponentText>) => (
  <ComponentText color={color} size={size} align={align} display={display}>
    {children}
  </ComponentText>
)
