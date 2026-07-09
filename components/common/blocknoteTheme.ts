import type { Theme } from '@blocknote/mantine'

// Grace アプリのカラー定義（ライト/ダークモード対応、zinc パレット準拠）
const lightTheme: Theme = {
  colors: {
    editor: {
      text: '#09090b', // zinc-950
      background: 'transparent',
    },
    menu: {
      text: '#09090b',
      background: '#ffffff',
    },
    tooltip: {
      text: '#ffffff',
      background: '#09090b',
    },
    hovered: {
      text: '#09090b',
      background: '#f4f4f5', // zinc-100
    },
    selected: {
      text: '#09090b',
      background: '#e4e4e7', // zinc-200
    },
    disabled: {
      text: '#71717a', // zinc-500
      background: '#f4f4f5',
    },
    shadow: 'rgba(0, 0, 0, 0.12)',
    border: '#e4e4e7', // zinc-200
    sideMenu: '#a1a1aa', // zinc-400
  },
  borderRadius: 8,
  fontFamily: '"Open Sans", "Helvetica Neue", Roboto, Arial, sans-serif',
}

const darkTheme: Theme = {
  colors: {
    editor: {
      text: '#d4d4d8', // zinc-300
      background: 'transparent',
    },
    menu: {
      text: '#d4d4d8',
      background: '#18181b', // zinc-900
    },
    tooltip: {
      text: '#18181b',
      background: '#d4d4d8',
    },
    hovered: {
      text: '#d4d4d8',
      background: '#27272a', // zinc-800
    },
    selected: {
      text: '#f4f4f5',
      background: '#3f3f46', // zinc-700
    },
    disabled: {
      text: '#71717a', // zinc-500
      background: '#27272a',
    },
    shadow: 'rgba(0, 0, 0, 0.4)',
    border: '#3f3f46', // zinc-700
    sideMenu: '#71717a',
  },
  borderRadius: 8,
  fontFamily: '"Open Sans", "Helvetica Neue", Roboto, Arial, sans-serif',
}

export const blockNoteTheme = {
  light: lightTheme,
  dark: darkTheme,
}
