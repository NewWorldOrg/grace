import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { ThemeProvider } from 'components/theme/ThemeProvider'
import { NO_FLASH_THEME_SCRIPT } from 'components/theme/noFlashThemeScript'

export const metadata: Metadata = {
  title: 'Grace',
  description: 'Grace application',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const headerStore = await headers()
  const themeHeader = headerStore.get('x-theme-mode')
  const explicitMode: 'light' | 'dark' | null =
    themeHeader === 'dark' ? 'dark' : themeHeader === 'light' ? 'light' : null
  const initialPreference: 'light' | 'dark' | 'system' =
    explicitMode ?? 'system'

  return (
    <html
      lang="ja"
      className={explicitMode === 'dark' ? 'dark' : undefined}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {explicitMode === null && (
          // 定数のちらつき防止スクリプトを注入（ユーザー入力なし・XSS リスクなし）
          <script
            id="no-flash-theme-init"
            dangerouslySetInnerHTML={{ __html: NO_FLASH_THEME_SCRIPT }}
          />
        )}
        <ThemeProvider initialPreference={initialPreference}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
