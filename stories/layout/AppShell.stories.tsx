import type { Meta, StoryObj } from '@storybook/react'
import AppShell from '../../components/layout/AppShell'

const sampleUser = {
  name: 'テストユーザー',
  iconUrl: null,
}

const meta = {
  title: 'Layout/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      navigation: {
        pathname: '/dashboard',
      },
    },
  },
  args: {
    user: sampleUser,
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
      </div>
    ),
  },
}

export const DrugListActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/medication/drugs',
      },
    },
  },
  args: {
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
      </div>
    ),
  },
}

export const DrugDetailWithBreadcrumbs: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/medication/drugs/1',
      },
    },
  },
  args: {
    breadcrumbs: [
      { text: 'Grace', href: '/dashboard' },
      { text: '薬一覧', href: '/medication/drugs' },
      { text: 'レボチロキシン', href: '/medication/drugs/1' },
    ],
    children: (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">レボチロキシン</h1>
      </div>
    ),
  },
}

export const MedicationHistoryActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/medication/history',
      },
    },
  },
  args: {
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
      </div>
    ),
  },
}

export const MedicationHistoryDetailWithBreadcrumbs: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/medication/history/1',
      },
    },
  },
  args: {
    breadcrumbs: [
      { text: 'Grace', href: '/dashboard' },
      { text: '服薬履歴', href: '/medication/history' },
      { text: '服薬履歴詳細', href: '/medication/history/1' },
    ],
    children: (
      <div className="flex flex-col gap-5">
        <h1 className="text-2xl font-bold">服薬履歴詳細</h1>
      </div>
    ),
  },
}

export const SettingsActive: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/settings',
      },
    },
  },
  args: {
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
      </div>
    ),
  },
}
