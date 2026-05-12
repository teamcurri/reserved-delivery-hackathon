import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Heading, InputRadio as InputRadioComponent } from '../../..'
import { CurriStorybookWrapper } from '../../curri-storybook-components'

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
      description: 'Label for InputRadio',
    },
  },

  component: InputRadioComponent,

  parameters: {
    design: { disabled: true },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <>
          <CurriStorybookWrapper
            title="Input Radio"
            description="Radio Component"
          >
            <Heading size="h5" as="h2">
              InputRadio Sandbox
            </Heading>
            <Primary />
            <Heading size="h5" as="h2">
              InputRadio Props
            </Heading>
            {/* <ArgsTable story={PRIMARY_STORY} /> */}
          </CurriStorybookWrapper>
        </>
      ),
    },
  },
  title: 'Components/Inputs/InputRadio',
}

export default meta

export const Default = ({
  className,
  checked,
  disabled,
  label,
  id,
  inputSize,
}: React.ComponentProps<typeof InputRadioComponent>) => (
  <InputRadioComponent
    className={className}
    disabled={disabled}
    checked={checked}
    label={label}
    id={id}
    inputSize={inputSize}
  />
)
