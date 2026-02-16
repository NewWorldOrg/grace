import type { ClientType } from './types'

export const userRepository = {
  async getCurrentUser(apiClient: ClientType) {
    try {
      const result = await apiClient.GET('/api/user')

      if (!result.data) {
        return null
      }

      return result.data.data
    } catch {
      return null
    }
  },
}
