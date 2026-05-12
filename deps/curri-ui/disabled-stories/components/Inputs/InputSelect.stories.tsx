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
  InputSelect as InputSelectComponent,
  Spacer,
} from '../../..'
import { CurriStorybookWrapper } from '../../curri-storybook-components'

const optionsList = [
  { disabled: false, selected: false, text: 'Option 1', value: 'options-1' },
  { disabled: false, selected: false, text: 'Option 2', value: 'option-2' },
  { disabled: true, selected: false, text: 'Option 3', value: 'option-3' },
  {
    disabled: false,
    selected: true,
    text: '--Please choose an option--',
    value: '',
  },
]

const multiOptionGroupList = [
  {
    optionGroupData: [
      {
        disabled: false,
        selected: true,
        text: '--Please choose an option--',
        value: '',
      },
    ],
    optionGroupLabel: '',
  },
  {
    optionGroupData: [
      {
        disabled: false,
        selected: false,
        text: 'Option 1',
        value: 'american-option-1',
      },
      {
        disabled: false,
        selected: false,
        text: 'Option 2',
        value: 'american-option-2',
      },
      {
        disabled: false,
        selected: false,
        text: 'Option 3',
        value: 'american-option-3',
      },
    ],
    optionGroupLabel: 'American Cars',
  },
  {
    optionGroupData: [
      {
        disabled: false,
        selected: false,
        text: 'Option 1',
        value: 'german-option-1',
      },
      {
        disabled: true,
        selected: false,
        text: 'Option 2',
        value: 'german-option-2',
      },
      {
        disabled: false,
        selected: false,
        text: 'Option 3',
        value: 'german-option-3',
      },
    ],
    optionGroupLabel: 'German Cars',
  },
]

const iconList = [undefined, ...Object.keys(Icons)]

const InputSelectCodeSnippet = `
<InputSelect
  as={SingleSelectGroup}
  label="Tis is a label"
  id="pick-options"
  inError={errors.length}
  iconTypeRight={Icons.ChevronDown}
  options={options}
/>
`
const meta: Meta<typeof Default> = {
  argTypes: {
    as: {
      control: {
        options: ['MultiOptionGroup', 'SingleSelectGroup'],
        type: 'select',
      },
      defaultValue: 'SingleSelectGroup',
      description:
        'Renders InputSelect as SingleSelectGroup or MultiOptionGroup',
    },
    centered: {
      control: {
        type: 'boolean',
      },
      defaultValue: false,
      description: 'Select Text centering',
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
      description: 'Error message for select group',
    },
    explanatoryMessage: {
      control: {
        type: 'text',
      },
      defaultValue: 'This is an explanatory message',
      description: 'Explanatory message message for select group',
    },
    iconTypeLeft: {
      control: {
        options: iconList,
        type: 'select',
      },
      description: 'Places an icon on the left of the select group',
    },
    iconTypeRight: {
      control: {
        options: iconList,
        type: 'select',
      },
      description: 'Places an icon on the right of the select group',
    },
    id: {
      control: {
        type: 'text',
      },
      defaultValue: 'id-for-select-group',
      description: 'HtmlFor select group',
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
      description: 'Label for select group',
    },
    name: {
      control: {
        type: 'text',
      },
      description: 'name for select group',
    },
    onBlur: { action: 'Select group onBlur' },
    onChange: { action: 'Select group onChange' },
    onClick: { action: 'Select group onClick' },
    onFocus: { action: 'Select group onFocus' },
    onRightIconClick: {
      action: 'Select group onRightIconClick',
      description: 'Adds click event to right icon',
    },
  },

  parameters: {
    design: { disable: true },
    docs: {
      page: () => (
        <CurriStorybookWrapper
          title="InputSelect"
          description="InputSelect component"
        >
          <Spacer value={30} />
          <Heading size="h5" as="h2">
            Sample InputSelect Source Code
          </Heading>
          <Source language="jsx" dark code={InputSelectCodeSnippet} />
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
  title: 'Components/Inputs/InputSelect',
}

export default meta

export const Default = ({
  label,
  inError,
  errorMessage,
  explanatoryMessage,
  id,
  as,
  iconTypeRight,
  iconTypeLeft,
  onClick,
  onRightIconClick,
  onBlur,
  name,
  onFocus,
  onChange,
  centered,
  inputSize,
  insideTextLeft,
  insideTextRight,
  disabled,
}: ComponentProps<typeof InputSelectComponent>) => {
  return (
    <div style={{ display: 'block', margin: '30px auto', width: '600px' }}>
      <InputSelectComponent
        label={label}
        inError={inError}
        inputSize={inputSize}
        errorMessage={inError ? errorMessage : ''}
        explanatoryMessage={explanatoryMessage}
        id={id}
        as={as}
        name={name}
        iconTypeRight={iconTypeRight}
        iconTypeLeft={iconTypeLeft}
        insideTextLeft={insideTextLeft}
        insideTextRight={insideTextRight}
        centered={centered}
        disabled={disabled}
        onClick={onClick}
        onRightIconClick={onRightIconClick}
        onBlur={onBlur}
        onFocus={onFocus}
        onChange={onChange}
        options={optionsList}
        multiOptionGroup={multiOptionGroupList}
      />
    </div>
  )
}
