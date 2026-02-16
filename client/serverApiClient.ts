import createClient from 'openapi-fetch'
import type { paths } from 'libs/api/generated/sophia'
import { apiBasePath, ssrApiBasePath } from 'utils/urls'

export function createServerApiClient({ cookie }: { cookie: string }) {
  return createClient<paths>({
    baseUrl: ssrApiBasePath,
    headers: {
      Cookie: cookie,
      Host: new URL(apiBasePath).host,
    },
  })
}
