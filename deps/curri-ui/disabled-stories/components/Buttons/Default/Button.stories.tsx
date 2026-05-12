import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
  Stories,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React, { ComponentProps } from 'react'

import {
  Button as ButtonComponent,
  Heading,
  // Icons
} from '../../../..'
import { CurriStorybookWrapper } from '../../../curri-storybook-components'

// const iconList = [undefined, ...Object.keys(Icons)]

const meta: Meta<typeof Button> = {
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
      defaultValue: 'Button',
      description: 'Child rendering of the Button',
    },
    className: {
      table: {
        description: true,
        disable: true,
      },
    },
    color: {
      control: {
        options: ['black', 'teal', 'red'],
        type: 'select',
      },
      defaultValue: 'black',
    },
    size: {
      control: {
        options: ['xsmall', 'small', 'medium', 'large'],
        type: 'select',
      },
      defaultValue: 'medium',
    },
    variant: {
      control: {
        options: ['filled', 'outlined', 'bare'],
        type: 'select',
      },
      defaultValue: 'filled',
    },
  },

  component: ButtonComponent,
  // iconTypeCenter: {
  //   control: {
  //     options: iconList,
  //     type: 'select',
  //   },
  //   description: 'Places an icon on the center of the button',
  // },

  // iconTypeLeft: {
  //   control: {
  //     options: iconList,
  //     type: 'select',
  //   },
  //   description: 'Places an icon on the left of the button',
  // },

  // iconTypeRight: {
  //   control: {
  //     options: iconList,
  //     type: 'select',
  //   },
  //   description: 'Places an icon on the right of the button',
  // },

  parameters: {
    actions: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=467%3A6864',
    },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper
          title="Button"
          description="Curri default Button component."
        >
          <Heading size="h5" as="h2">
            Button Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Button Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
          <Stories title="Button Variations" />
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Buttons/Default',
}

export default meta

export const Button = ({
  color,
  variant,
  isLoading,
  isActive,
  size,
  disabled,
  children,
  isCenter,
  iconTypeRight,
  iconTypeLeft,
  iconTypeCenter: IconTypeCenter,
  isFullWidth,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent
    color={color}
    size={size}
    isFullWidth={isFullWidth}
    variant={variant}
    iconTypeRight={iconTypeRight}
    iconTypeLeft={iconTypeLeft}
    iconTypeCenter={IconTypeCenter}
    isLoading={isLoading}
    isActive={isActive}
    disabled={disabled}
    isCenter={isCenter}
  >
    {children}
  </ButtonComponent>
)

export const BlackFilled = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="black" variant="filled">
    {children}
  </ButtonComponent>
)

BlackFilled.parameters = { controls: { disable: true } }

export const BlackOutlined = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="black" variant="outlined">
    {children}
  </ButtonComponent>
)

BlackOutlined.parameters = { controls: { disable: true } }

export const BlackBare = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="black" variant="bare">
    {children}
  </ButtonComponent>
)

BlackBare.parameters = { controls: { disable: true } }

export const TealFilled = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="teal" variant="filled">
    {children}
  </ButtonComponent>
)

TealFilled.parameters = { controls: { disable: true } }

export const TealOutlined = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="teal" variant="outlined">
    {children}
  </ButtonComponent>
)

TealOutlined.parameters = { controls: { disable: true } }

export const TealBare = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="teal" variant="bare">
    {children}
  </ButtonComponent>
)

TealBare.parameters = { controls: { disable: true } }

export const RedFilled = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="red" variant="filled">
    {children}
  </ButtonComponent>
)

RedFilled.parameters = { controls: { disable: true } }

export const RedOutlined = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="red" variant="outlined">
    {children}
  </ButtonComponent>
)

RedOutlined.parameters = { controls: { disable: true } }

export const RedOBare = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="red" variant="bare">
    {children}
  </ButtonComponent>
)

RedOBare.parameters = { controls: { disable: true } }

export const ButtonWithIconRight = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="black" variant="filled" iconTypeRight="Box">
    {children}
  </ButtonComponent>
)

ButtonWithIconRight.parameters = { controls: { disable: true } }

export const ButtonWithIconLeft = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="black" variant="filled" iconTypeLeft="Box">
    {children}
  </ButtonComponent>
)

ButtonWithIconLeft.parameters = { controls: { disable: true } }

export const ButtonWithIconCenter = ({
  children,
}: ComponentProps<typeof ButtonComponent>) => (
  <ButtonComponent color="black" variant="filled" iconTypeCenter="Box">
    {children}
  </ButtonComponent>
)

ButtonWithIconCenter.parameters = { controls: { disable: true } }
