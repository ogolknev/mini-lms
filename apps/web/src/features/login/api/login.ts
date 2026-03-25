import type { User } from '@/entities/user'
import { apiClient } from '@/shared/api'

export async function login(credentials: Credentials) {
  apiClient.unsetAuthKey()

  const response = await apiClient.fetch('/api/auth/local', { body: credentials, method: 'POST' })
  const data: { jwt: string; user: User } = response.data

  apiClient.setAuthKey(data.jwt)

  return data
}

interface Credentials {
  identifier: string
  password: string
}
