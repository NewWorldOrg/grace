import type { Decorator } from '@storybook/react'
import AppShell from '../components/layout/AppShell'

const sampleUser = {
  name: 'テストユーザー',
  iconUrl: null,
}

export const withAppShell: Decorator = (Story) => (
  <AppShell user={sampleUser}>
    <Story />
  </AppShell>
)
