'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from 'components/ui/card'
import { Button } from 'components/ui/button'
import { LogIn } from 'lucide-react'
import { loginPath, loginPathWithReturnToURL } from 'utils/urls'

export default function LoginRequired({ returnTo }: { returnTo?: string }) {
  return (
    <div className="flex min-h-svh items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold text-center">Grace</h1>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">ログイン</CardTitle>
              <CardDescription>
                サービスを利用するにはログインが必要です
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full">
                <a
                  href={
                    returnTo ? loginPathWithReturnToURL(returnTo) : loginPath
                  }
                >
                  <LogIn className="size-4" />
                  ログイン
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
