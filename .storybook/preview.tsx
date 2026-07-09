import React, { useEffect } from 'react'
import type { Preview } from '@storybook/react'
import '../app/globals.css'
import {
  ThemeProvider,
  type ThemePreference,
} from '../components/theme/ThemeProvider'

/**
 * Storybook ツールバーの `theme` グローバルに応じて preview ドキュメントに
 * `dark` クラスを適用し、ThemeProvider でラップする。実アプリでは SSR の
 * layout が <html> に初期クラスを設定するが、Storybook に SSR は無いため
 * ここで設定する。
 */
function WithTheme({
  theme,
  children,
}: {
  theme: ThemePreference
  children: React.ReactNode
}) {
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // key でツールバー切替時に remount し、Provider の state を初期化し直す
  return (
    <ThemeProvider key={theme} initialPreference={theme}>
      {children}
    </ThemeProvider>
  )
}

const globalDecorators: Preview['decorators'] = [
  (Story, context) => {
    useEffect(() => {
      const handler = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement).closest('a[href]')
        if (!anchor) return
        const href = anchor.getAttribute('href')
        if (!href) return
        if (anchor.getAttribute('target') === '_blank') return
        if (href.startsWith('/') || href.startsWith('?')) {
          e.preventDefault()
          e.stopPropagation()
        }
      }
      document.addEventListener('click', handler, true)
      return () => document.removeEventListener('click', handler, true)
    }, [])

    const theme: ThemePreference =
      context.globals.theme === 'dark' ? 'dark' : 'light'
    return (
      <WithTheme theme={theme}>
        <Story />
      </WithTheme>
    )
  },
]

const preview: Preview = {
  decorators: globalDecorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: '/',
      },
    },
    a11y: {
      // a11y 違反は UI 上に表示するだけで、まだ実行は失敗させない
      test: 'todo',
    },
  },
  globalTypes: {
    theme: {
      description: 'テーマ',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'sun',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
}

export default preview
