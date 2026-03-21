'use client'

import {
  Header,
  SpaceBetween,
  StatusIndicator,
  Table,
} from '@cloudscape-design/components'

const medicationHistory = [
  { id: '1', date: '2026-02-15', name: 'レボチロキシン', time: '07:30', status: 'completed' },
  { id: '2', date: '2026-02-14', name: 'レボチロキシン', time: '07:25', status: 'completed' },
  { id: '3', date: '2026-02-13', name: 'レボチロキシン', time: '08:10', status: 'completed' },
  { id: '4', date: '2026-02-12', name: 'レボチロキシン', time: '07:45', status: 'completed' },
  { id: '5', date: '2026-02-11', name: 'レボチロキシン', time: '-', status: 'missed' },
  { id: '6', date: '2026-02-10', name: 'レボチロキシン', time: '07:30', status: 'completed' },
  { id: '7', date: '2026-02-09', name: 'レボチロキシン', time: '09:00', status: 'completed' },
  { id: '8', date: '2026-02-08', name: 'レボチロキシン', time: '07:35', status: 'completed' },
  { id: '9', date: '2026-02-07', name: 'レボチロキシン', time: '07:40', status: 'completed' },
  { id: '10', date: '2026-02-06', name: 'レボチロキシン', time: '-', status: 'missed' },
] as const

export default function MedicationHistoryPage() {
  return (
    <SpaceBetween size="l">
      <Header variant="h1">服薬履歴</Header>

      <Table
        variant="container"
        header={
          <Header variant="h2" counter={`(${medicationHistory.length})`}>
            履歴一覧
          </Header>
        }
        columnDefinitions={[
          { id: 'date', header: '日付', cell: (item) => item.date, sortingField: 'date' },
          { id: 'name', header: '薬名', cell: (item) => item.name },
          { id: 'time', header: '服薬時刻', cell: (item) => item.time },
          {
            id: 'status',
            header: 'ステータス',
            cell: (item) =>
              item.status === 'completed' ? (
                <StatusIndicator type="success">服薬済み</StatusIndicator>
              ) : (
                <StatusIndicator type="error">未服薬</StatusIndicator>
              ),
          },
        ]}
        items={[...medicationHistory]}
        trackBy="id"
        sortingDisabled
        empty="服薬履歴がありません"
      />
    </SpaceBetween>
  )
}
