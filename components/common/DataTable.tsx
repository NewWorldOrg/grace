'use client'

import type { CSSProperties, ReactNode } from 'react'
import {
  type ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'components/ui/table'

interface DataTableProps<TData> {
  columns: ColumnDef<TData, unknown>[]
  data: TData[]
  trackBy?: keyof TData | ((row: TData) => string)
  loading?: boolean
  loadingText?: string
  emptyText?: ReactNode
  onRowClick?: (row: TData) => void
  scrollAreaClassName?: string
}

export default function DataTable<TData>({
  columns,
  data,
  trackBy,
  loading,
  loadingText = '読み込み中...',
  emptyText,
  onRowClick,
  scrollAreaClassName = 'h-full overflow-auto',
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  })

  const getRowKey = (row: TData, index: number): string => {
    if (!trackBy) return String(index)
    if (typeof trackBy === 'function') return trackBy(row)
    return String(row[trackBy])
  }

  const colSpan = table.getAllLeafColumns().length

  return (
    <Table containerClassName={scrollAreaClassName}>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const minWidthPx = header.column.columnDef.meta?.minWidthPx
              const isSticky = header.column.columnDef.meta?.sticky === 'left'
              return (
                <TableHead
                  key={header.id}
                  className={cn(
                    isSticky && 'sticky left-0 z-30 bg-table-header',
                  )}
                  style={
                    minWidthPx ? { minWidth: `${minWidthPx}px` } : undefined
                  }
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {loading ? (
          <TableRow>
            <TableCell
              colSpan={colSpan}
              className="py-8 text-center text-muted-foreground"
            >
              {loadingText}
            </TableCell>
          </TableRow>
        ) : table.getRowModel().rows.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={colSpan}
              className="py-8 text-center text-muted-foreground"
            >
              {emptyText}
            </TableCell>
          </TableRow>
        ) : (
          table.getRowModel().rows.map((row, index) => (
            <TableRow
              key={getRowKey(row.original, index)}
              className={cn(onRowClick && 'cursor-pointer hover:bg-muted/50')}
              tabIndex={onRowClick ? 0 : undefined}
              role={onRowClick ? 'button' : undefined}
              onClick={
                onRowClick
                  ? (e) => {
                      const target = e.target as HTMLElement
                      if (
                        target.closest(
                          'a, button, input, select, textarea, [data-slot="checkbox"]',
                        )
                      )
                        return
                      onRowClick(row.original)
                    }
                  : undefined
              }
              onKeyDown={
                onRowClick
                  ? (e) => {
                      if (e.key !== 'Enter' && e.key !== ' ') return
                      const target = e.target as HTMLElement
                      if (
                        target.closest(
                          'a, button, input, select, textarea, [data-slot="checkbox"]',
                        )
                      )
                        return
                      e.preventDefault()
                      onRowClick(row.original)
                    }
                  : undefined
              }
            >
              {row.getVisibleCells().map((cell) => {
                const minWidthPx = cell.column.columnDef.meta?.minWidthPx
                const cellStyle: CSSProperties | undefined = minWidthPx
                  ? { minWidth: `${minWidthPx}px` }
                  : undefined
                return (
                  <TableCell key={cell.id} style={cellStyle}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
