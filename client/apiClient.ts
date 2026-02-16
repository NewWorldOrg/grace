'use client'

import { useMemo } from 'react'
import createClient from 'openapi-fetch'
import type { paths } from 'libs/api/generated/sophia'

export function useApiClient() {
  return useMemo(() => createClient<paths>({ baseUrl: '' }), [])
}
