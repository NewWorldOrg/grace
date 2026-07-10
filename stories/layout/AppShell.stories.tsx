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
    title: '薬一覧',
  },
} satisfies Meta<typeof AppShell>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'ダッシュボード',
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
    title: '薬一覧',
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
    title: 'レボチロキシン - 薬詳細',
    breadcrumbs: [
      { text: 'Grace', href: '/dashboard' },
      { text: '薬一覧', href: '/medication/drugs' },
      { text: 'レボチロキシン', href: '/medication/drugs/1' },
    ],
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
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
    title: '服薬履歴',
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
    title: '服薬履歴詳細',
    breadcrumbs: [
      { text: 'Grace', href: '/dashboard' },
      { text: '服薬履歴', href: '/medication/history' },
      { text: '服薬履歴詳細', href: '/medication/history/1' },
    ],
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
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
    title: '設定',
    children: (
      <div className="flex flex-col gap-5">
        <p className="text-sm text-muted-foreground">コンテンツエリア</p>
      </div>
    ),
  },
}
