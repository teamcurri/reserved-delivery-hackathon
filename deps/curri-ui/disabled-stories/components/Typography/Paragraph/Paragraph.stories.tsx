import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Paragraph as ParagraphComponent } from '../../../..'
import { CurriStorybookWrapper } from '../../../curri-storybook-components'
import { ParagraphDocumentation } from './Documentation'

const FONT_SIZES = ['xsmall', 'small', 'medium', 'large'] as const

export const Default = ({
  color,
  size,
  align,
  display,
  textTransform,
  fontWeight,
  children,
  isItalic,
  isStrikeout,
  isUnderline,
}: React.ComponentProps<typeof ParagraphComponent>) => (
  <ParagraphComponent
    color={color}
    size={size}
    align={align}
    display={display}
    fontWeight={fontWeight}
    textTransform={textTransform}
    isItalic={isItalic}
    isStrikeout={isStrikeout}
    isUnderline={isUnderline}
  >
    {children}
  </ParagraphComponent>
)

const meta: Meta<typeof Default> = {
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
    fontWeight: {
      control: {
        options: ['regular', 'medium', 'semi-bold'],
        type: 'select',
      },
      defaultValue: 'regular',
      description: 'Text default font weights',
    },
    size: {
      control: {
        options: FONT_SIZES,
        type: 'select',
      },
      defaultValue: 'small',
    },
    style: {
      table: {
        description: true,
        disable: true,
      },
    },
    textTransform: {
      control: {
        options: ['uppercase', 'lowercase', 'capitalize', 'none'],
        type: 'select',
      },
      defaultValue: 'none',
      description: 'Transform Text Style',
    },
  },
  component: ParagraphComponent,

  parameters: {
    actions: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=149%3A6543',
    },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper
          title="Paragraph"
          description="A set of harmonous typography scale with font weight variations. These text style perfectly fit for 4px grid and go well with each other."
        >
          <ParagraphDocumentation />
          <Primary />
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Typography/Paragraph',
}

export default meta
