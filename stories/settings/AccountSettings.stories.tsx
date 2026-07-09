import type { Meta, StoryObj } from '@storybook/react'
import AccountSettings from '../../components/settings/AccountSettings'

const meta = {
  title: 'Components/AccountSettings',
  component: AccountSettings,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof AccountSettings>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    userName: 'テストユーザー',
    authProvider: 'Auth0',
    onLogout: () => {},
  },
}
