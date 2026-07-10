'use client'

import { useRouter } from 'next/navigation'
import { type ColumnDef } from '@tanstack/react-table'
import { FileText } from 'lucide-react'
import PaginatedTable from 'components/common/PaginatedTable'

interface MedicationRecord {
  id: string
  name: string
  amount: number
  takenAt: string
  hasNote?: boolean
}

const columns: ColumnDef<MedicationRecord, unknown>[] = [
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
    id: 'amount',
    header: '服薬量(mg)',
    cell: ({ row }) => `${row.original.amount}mg`,
  },
  {
    id: 'takenAt',
    header: '服薬日時',
    cell: ({ row }) => row.original.takenAt,
  },
]

interface MedicationHistoryTableProps {
  items: MedicationRecord[]
  loading?: boolean
  currentPage: number
  lastPage: number
  perPage: number
  total: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
}

export default function MedicationHistoryTable({
  items,
  loading,
  currentPage,
  lastPage,
  perPage,
  total,
  onPageChange,
  onPageSizeChange,
}: MedicationHistoryTableProps) {
  const router = useRouter()

  return (
    <PaginatedTable
      title="履歴一覧"
      columns={columns}
      items={items}
      trackBy="id"
      loading={loading}
      emptyText="服薬履歴がありません"
      currentPage={currentPage}
      lastPage={lastPage}
      perPage={perPage}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      onRowClick={(item) => router.push(`/medication/history/${item.id}`)}
    />
  )
}
