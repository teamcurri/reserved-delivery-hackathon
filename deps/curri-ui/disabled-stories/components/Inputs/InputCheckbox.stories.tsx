import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Heading, InputCheckbox as InputCheckboxComponent } from '../../../src'
import { CurriStorybookWrapper } from '../../../src/stories/curri-storybook-components'

const meta: Meta<typeof Default> = {
  argTypes: {
    checked: {
      control: {
        options: [true, false],
        type: 'radio',
      },
      defaultValue: true,
    },
    className: {
      table: {
        description: true,
        disable: true,
      },
    },
    disabled: {
      control: {
        options: [true, false],
        type: 'radio',
      },
      defaultValue: false,
    },
    id: {
      control: {
        type: 'text',
      },
      defaultValue: 'id-for-input',
      description: 'ID for InputCheckbox',
    },
    inputSize: {
      control: {
        options: ['xsmall', 'small', 'medium', 'large'],
        type: 'radio',
      },
      defaultValue: 'large',
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is a Label',
      description: 'Label for InputCheckbox',
    },
    labelFontWeight: {
      control: {
        options: ['medium', 'regular', 'semi-bold'],
        type: 'radio',
      },
      defaultValue: 'semi-bold',
    },
  },

  component: InputCheckboxComponent,

  parameters: {
    design: { disabled: true },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <>
          <CurriStorybookWrapper
            title="Input Checkbox"
            description="Checkbox Component"
          >
            <Heading size="h5" as="h2">
              InputCheckbox Sandbox
            </Heading>
            <Primary />
            <Heading size="h5" as="h2">
              InputCheckbox Props
            </Heading>
            {/* <ArgsTable story={PRIMARY_STORY} /> */}
          </CurriStorybookWrapper>
        </>
      ),
    },
  },
  title: 'Components/Inputs/InputCheckbox',
}

export default meta

export const Default = ({
  className,
  checked,
  inputSize,
  labelFontWeight,
  disabled,
  label,
  id,
}: React.ComponentProps<typeof InputCheckboxComponent>) => (
  <InputCheckboxComponent
    id={id}
    className={className}
    disabled={disabled}
    checked={checked}
    inputSize={inputSize}
    label={label}
    labelFontWeight={labelFontWeight}
  />
)
