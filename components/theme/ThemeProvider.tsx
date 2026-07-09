'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type ThemeMode = 'light' | 'dark'
export type ThemePreference = ThemeMode | 'system'

interface ThemeContextValue {
  /** 実際に適用されているテーマ（`system` 時は matchMedia の解決結果） */
  mode: ThemeMode
  /** ユーザーの選択（`light` / `dark` / `system`） */
  preference: ThemePreference
  /** 選択を変更する（Cookie に永続化） */
  setPreference: (pref: ThemePreference) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

const COOKIE_KEY = 'grace-theme-mode'

function writeCookie(value: ThemePreference) {
  document.cookie = `${COOKIE_KEY}=${value};path=/;max-age=31536000;SameSite=Lax`
}

function applyClass(mode: ThemeMode) {
  if (mode === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

function resolveSystemMode(): ThemeMode {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

export function ThemeProvider({
  children,
  initialPreference,
}: {
  children: ReactNode
  initialPreference: ThemePreference
}) {
  const [preference, setPreferenceState] =
    useState<ThemePreference>(initialPreference)
  const [mode, setMode] = useState<ThemeMode>(() =>
    initialPreference === 'dark' ? 'dark' : 'light',
  )

  // useEffect の例外: ブラウザ API (window.matchMedia) の購読とクリーンアップ
  useEffect(() => {
    if (preference !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = (matches: boolean) => {
      const next: ThemeMode = matches ? 'dark' : 'light'
      setMode(next)
      applyClass(next)
    }

    apply(mediaQuery.matches)

    const listener = (e: MediaQueryListEvent) => apply(e.matches)
    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [preference])

  const setPreference = useCallback((next: ThemePreference) => {
    setPreferenceState(next)
    writeCookie(next)

    if (next === 'system') {
      // effect でも反映されるが、選択直後の描画を速くするためここでも適用する
      const resolved = resolveSystemMode()
      setMode(resolved)
      applyClass(resolved)
    } else {
      setMode(next)
      applyClass(next)
    }
  }, [])

  return (
    <ThemeContext.Provider value={{ mode, preference, setPreference }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
