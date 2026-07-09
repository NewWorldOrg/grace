import type { Meta, StoryObj } from '@storybook/react'
import DisplaySettings from '../../components/settings/DisplaySettings'

const meta = {
  title: 'Components/DisplaySettings',
  component: DisplaySettings,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DisplaySettings>

export default meta
type Story = StoryObj<typeof meta>

export const Light: Story = {
  args: {
    preference: 'light',
    onChangePreference: () => {},
  },
}

export const Dark: Story = {
  args: {
    preference: 'dark',
    onChangePreference: () => {},
  },
}

export const System: Story = {
  args: {
    preference: 'system',
    onChangePreference: () => {},
  },
}
