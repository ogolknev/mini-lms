import { apiClient } from '@/shared/api'
import type { User } from '../model/interface'

export async function getProfile() {

  const response = await apiClient.fetch('/api/users/me')

  const profile: User = response.data

  return profile
}
