'use client'

import { useRouter } from 'next/navigation'
import { type ColumnDef } from '@tanstack/react-table'
import { FileText, ExternalLink } from 'lucide-react'
import PaginatedTable from 'components/common/PaginatedTable'

interface Drug {
  id: string
  name: string
  url: string
  hasNote?: boolean
}

const columns: ColumnDef<Drug, unknown>[] = [
  {
    id: 'name',
    header: '薬名',
    cell: ({ row }) => (
      <span className="inline-flex items-center gap-1">
        {row.original.name || '-'}
        {row.original.hasNote && (
          <FileText className="size-3.5 text-muted-foreground" />
        )}
      </span>
    ),
  },
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

interface DrugListTableProps {
  items: Drug[]
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export default function DrugListTable({
  items,
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPageSizeChange,
}: DrugListTableProps) {
  const router = useRouter()

  return (
    <PaginatedTable
      title="薬一覧"
      columns={columns}
      items={items}
      trackBy="id"
      emptyText="薬が登録されていません"
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onRowClick={(item) => router.push(`/medication/drugs/${item.id}`)}
    />
  )
}
