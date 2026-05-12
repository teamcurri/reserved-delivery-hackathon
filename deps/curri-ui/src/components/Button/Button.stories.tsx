import type { Meta, StoryObj } from '@storybook/react'

import { Button } from './Button'

// 👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Button> = {
  component: Button,
}

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
  args: {
    children: 'Button Text',
  },
}

export const TealOutline: Story = {
  args: {
    ...Default.args,
    color: 'teal',
    variant: 'outlined',
  },
}
