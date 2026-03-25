import { apiClient } from '@/shared/api'
import type { User } from '../model/interface'

export async function getProfile() {
  const query = {
    populate: 'student',
  }

  const response = await apiClient.fetch('/api/users/me', { query })

  const profile: User = response.data

  return profile
}
