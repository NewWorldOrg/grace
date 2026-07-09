'use client'

import { Laptop, Moon, Sun, Check, type LucideIcon } from 'lucide-react'
import { Button } from 'components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'components/ui/dropdown-menu'
import { useTheme, type ThemePreference } from 'components/theme/ThemeProvider'

interface ThemeToggleProps {
  className?: string
  variant?: React.ComponentProps<typeof Button>['variant']
  size?: React.ComponentProps<typeof Button>['size']
}

const OPTIONS: { value: ThemePreference; label: string; Icon: LucideIcon }[] = [
  { value: 'light', label: 'ライト', Icon: Sun },
  { value: 'dark', label: 'ダーク', Icon: Moon },
  { value: 'system', label: 'システム', Icon: Laptop },
]

const MODE_LABELS: Record<ThemePreference, string> = {
  light: 'ライト',
  dark: 'ダーク',
  system: 'システム',
}

/**
 * テーマ切替。ライト / ダーク / システムの3択。
 * トリガーアイコンは `preference` に追従する（`system` 選択時は Laptop）。
 */
export function ThemeToggle({
  className,
  variant = 'ghost',
  size = 'icon-sm',
}: ThemeToggleProps) {
  const { mode, preference, setPreference } = useTheme()

  const TriggerIcon =
    preference === 'light' ? Sun : preference === 'dark' ? Moon : Laptop

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          aria-label="テーマ切替"
          className={className}
        >
          <TriggerIcon className="size-4" />
          <span className="sr-only">
            現在のテーマ: {MODE_LABELS[preference]}（表示は {MODE_LABELS[mode]}
            ）
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel>テーマ</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {OPTIONS.map(({ value, label, Icon }) => {
          const selected = preference === value
          return (
            <DropdownMenuItem
              key={value}
              onSelect={() => setPreference(value)}
              className="flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Icon className="size-4" />
                {label}
              </span>
              {selected && <Check className="size-4" aria-hidden="true" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
