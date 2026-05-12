import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Heading, Heading as HeadingComponent } from '../../../..'
import { CurriStorybookWrapper } from '../../../curri-storybook-components'
import { Mobile as MobileDocumentation } from './HeadingDocumentation'

const meta: Meta<typeof HeadingComponent> = {
  argTypes: {
    align: {
      control: {
        options: ['left', 'center', 'right'],
        type: 'radio',
      },
      defaultValue: 'left',
    },
    as: {
      control: {
        options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        type: 'radio',
      },
      defaultValue: 'h1',
      description: 'Defines what h* component to render',
    },
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is a headline',
      description: 'Child rendering of the headline',
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
      description: 'Changes the color of the headline.',
    },
    size: {
      control: {
        options: [
          'displayLarge',
          'displaySmall',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
        ],
        type: 'radio',
      },
      defaultValue: 'h1',
    },
    style: {
      table: {
        description: true,
        disable: true,
      },
    },
  },
  component: HeadingComponent,
  parameters: {
    actions: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=149%3A6534',
    },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper
          title="Mobile Headings"
          description="A set of harmonous typography scale with font weight variations. These text style perfectly fit for 4px grid and go well with each other."
        >
          <MobileDocumentation />
          <Heading size="h5" as="h2">
            Heading Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Heading Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Typography/Heading',
}

export default meta

const Mobile = ({
  as,
  color,
  size,
  align,
  fontWeight,
  textTransform,
  children,
}: React.ComponentProps<typeof HeadingComponent>) => (
  <HeadingComponent
    as={as}
    color={color}
    size={size}
    textTransform={textTransform}
    fontWeight={fontWeight}
    align={align}
  >
    {children}
  </HeadingComponent>
)

export { Mobile }
