import { NextRequest, NextResponse } from 'next/server'
import { createServerApiClient } from 'client/serverApiClient'
import { userRepository } from 'repository/userRepository'

function redirectToLoginPage(request: NextRequest) {
  const returnTo = request.nextUrl.pathname + request.nextUrl.search
  const loginUrl = new URL('/auth/login', request.url)
  loginUrl.searchParams.set('return_to', returnTo)
  return NextResponse.redirect(loginUrl)
}

export async function middleware(request: NextRequest) {
  const cookie = request.headers.get('cookie') ?? ''
  const apiClient = createServerApiClient({ cookie })
  const currentUser = await userRepository.getCurrentUser(apiClient)

  if (!currentUser) {
    return redirectToLoginPage(request)
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/(dashboard|settings)(/?.*)',
}
