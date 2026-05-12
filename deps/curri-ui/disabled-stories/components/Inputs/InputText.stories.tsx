import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
  Source,
  Stories,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React, { ComponentProps } from 'react'

import {
  Heading,
  Icons,
  InputText as InputTextComponent,
  Spacer,
} from '../../..'
import { CurriStorybookWrapper } from '../../curri-storybook-components'

const inputTypes = [
  'email',
  'file',
  'month',
  'number',
  'password',
  'submit',
  'text',
  'week',
] as const

const iconList = [undefined, ...Object.keys(Icons)]

const InputTextCodeSnippet = `
<InputText
  label="First Name"
  htmlFor="first-name"
  value={prop.firstName}
/>
`
const meta: Meta<typeof Default> = {
  argTypes: {
    as: {
      control: {
        options: ['Textarea', 'Input'],
        type: 'select',
      },
      defaultValue: 'Input',
      description: 'Renders InputText as input or textarea',
    },
    centered: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'Input Text centering',
    },
    defaultValue: {
      control: {
        type: 'text',
      },
      description: 'name for Input',
    },
    disabled: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'disabled state',
    },
    errorMessage: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is an error message',
      description: 'Error message for Input',
    },
    explanatoryMessage: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is an explanatoryMessage message',
      description: 'Explanatory message message for Input',
    },
    htmlFor: {
      control: {
        type: 'text',
      },
      defaultValue: 'id-for-input',
      description: 'HtmlFor Input',
    },
    iconTypeLeft: {
      control: {
        options: iconList,
        type: 'select',
      },
      description: 'Places an icon on the left of the input',
    },
    iconTypeRight: {
      control: {
        options: iconList,
        type: 'select',
      },
      description: 'Places an icon on the right of the input',
    },
    inError: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'Error state',
    },
    inputSize: {
      control: {
        options: ['xsmall', 'small', 'medium', 'large'],
        type: 'select',
      },
      defaultValue: 'large',
    },
    insideTextLeft: {
      control: {
        type: 'text',
      },
      description: 'Inside Text Left',
    },
    insideTextRight: {
      control: {
        type: 'text',
      },
      description: 'Inside Text Right',
    },
    label: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is a Label',
      description: 'Label for Input',
    },
    maxLength: {
      control: {
        type: 'number',
      },
      description: 'Input max length',
    },
    minLength: {
      control: {
        type: 'number',
      },
      description: 'Input min length',
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'name for Input',
    },
    onBlur: { action: 'Input onBlur' },
    onChange: { action: 'Input onChange' },
    onClick: { action: 'Input onClick' },
    onFocus: { action: 'Input onFocus' },
    onRightIconClick: {
      action: 'Input onRightIconClick',
      description: 'Adds click event to right icon',
    },
    placeholder: {
      control: {
        type: 'text',
      },
      defaultValue: 'Label Placeholder',
      description: 'This is a placeholder for input',
    },
    type: {
      control: {
        options: inputTypes,
        type: 'select',
      },
      defaultValue: 'text',
      description: 'Sets specific type to InputText',
    },
    value: {
      control: {
        type: 'text',
      },
      description: 'name for Input',
    },
  },

  parameters: {
    design: { disable: true },
    docs: {
      page: () => (
        <CurriStorybookWrapper
          title="InputText"
          description="InputText component"
        >
          <Spacer value={30} />
          <Heading size="h5" as="h2">
            Sample InputText Source Code
          </Heading>
          <Source language="jsx" dark code={InputTextCodeSnippet} />
          <Heading size="h5" as="h2">
            Inputs Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Inputs Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
          <Stories />
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Inputs/InputText',
}

export default meta

export const Default = ({
  label,
  inError,
  errorMessage,
  explanatoryMessage,
  htmlFor,
  as,
  iconTypeRight,
  iconTypeLeft,
  onClick,
  onRightIconClick,
  placeholder,
  type,
  maxLength,
  minLength,
  onBlur,
  name,
  onFocus,
  onChange,
  centered,
  value,
  defaultValue,
  inputSize,
  insideTextLeft,
  insideTextRight,
  disabled,
}: ComponentProps<typeof InputTextComponent>) => {
  return (
    <div style={{ display: 'block', margin: '30px auto', width: '600px' }}>
      <InputTextComponent
        label={label}
        inError={inError}
        inputSize={inputSize}
        errorMessage={inError ? errorMessage : ''}
        explanatoryMessage={explanatoryMessage}
        htmlFor={htmlFor}
        as={as}
        name={name}
        iconTypeRight={iconTypeRight}
        iconTypeLeft={iconTypeLeft}
        placeholder={placeholder}
        type={type}
        insideTextLeft={insideTextLeft}
        insideTextRight={insideTextRight}
        maxLength={maxLength}
        minLength={minLength}
        centered={centered}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onClick={onClick}
        onRightIconClick={onRightIconClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
      />
    </div>
  )
}
