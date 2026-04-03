import { headers } from 'next/headers'

export async function getInitialSidebarOpen(): Promise<boolean> {
  const headerStore = await headers()
  return headerStore.get('x-sidebar-open') !== 'false'
}
