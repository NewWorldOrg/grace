import { Card, CardContent, CardHeader, CardTitle } from 'components/ui/card'
import { Label } from 'components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'components/ui/select'
import type { ThemePreference } from 'components/theme/ThemeProvider'

interface DisplaySettingsProps {
  preference: ThemePreference
  onChangePreference: (preference: ThemePreference) => void
}

const THEME_OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: 'light', label: 'ライト' },
  { value: 'dark', label: 'ダーク' },
  { value: 'system', label: 'システム' },
]

export default function DisplaySettings({
  preference,
  onChangePreference,
}: DisplaySettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>表示設定</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-3">
          <Label htmlFor="theme-preference">テーマ</Label>
          <Select
            value={preference}
            onValueChange={(value) =>
              onChangePreference(value as ThemePreference)
            }
          >
            <SelectTrigger id="theme-preference" className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {THEME_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
