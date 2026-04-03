import AppShell from 'components/layout/AppShell'
import SettingsPage from 'components/page-component/SettingsPage'
import { getServerUser } from 'libs/server/getServerUser'
import { getInitialSidebarOpen } from 'libs/server/getInitialSidebarOpen'

export default async function PageSettings() {
  const user = await getServerUser()
  const initialSidebarOpen = await getInitialSidebarOpen()

  return (
    <AppShell user={user ?? undefined} initialSidebarOpen={initialSidebarOpen}>
      <SettingsPage userName={user?.name ?? ''} />
    </AppShell>
  )
}
