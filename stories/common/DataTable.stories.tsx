import type { Meta, StoryObj } from '@storybook/react'
import { type ColumnDef } from '@tanstack/react-table'
import { ExternalLink } from 'lucide-react'
import DataTable from '../../components/common/DataTable'

interface Row {
  id: string
  name: string
  amount: number
  url?: string
}

const columns: ColumnDef<Row, unknown>[] = [
  { id: 'name', header: '薬名', cell: ({ row }) => row.original.name },
  {
    id: 'amount',
    header: '服薬量(mg)',
    cell: ({ row }) => `${row.original.amount}mg`,
  },
]

const linkColumns: ColumnDef<Row, unknown>[] = [
  { id: 'name', header: '薬名', cell: ({ row }) => row.original.name },
  {
    id: 'url',
    header: 'リンク',
    cell: ({ row }) =>
      row.original.url ? (
        <a
          href={row.original.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-primary hover:underline"
          onClick={(e) => e.stopPropagation()}
        >
          詳細
          <ExternalLink className="size-3" />
        </a>
      ) : (
        '-'
      ),
  },
]

const rows: Row[] = [
  { id: '1', name: 'レボチロキシン', amount: 1 },
  { id: '2', name: 'ロキソプロフェン', amount: 2 },
  { id: '3', name: 'アムロジピン', amount: 5 },
]

const meta = {
  title: 'Components/DataTable',
  component: DataTable<Row>,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof DataTable<Row>>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns,
    data: rows,
    trackBy: 'id',
    onRowClick: (row) => alert(row.name),
  },
}

export const Empty: Story = {
  args: {
    columns,
    data: [],
    emptyText: 'データがありません',
  },
}

export const Loading: Story = {
  args: {
    columns,
    data: [],
    loading: true,
  },
}

export const ClickableWithLink: Story = {
  args: {
    columns: linkColumns,
    data: [
      {
        id: '1',
        name: 'レボチロキシン',
        amount: 1,
        url: 'https://example.com',
      },
      { id: '2', name: 'ロキソプロフェン', amount: 2, url: '' },
    ],
    trackBy: 'id',
    onRowClick: (row) => alert(row.name),
  },
}
