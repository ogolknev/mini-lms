import type { User } from '@/entities/user'
import { apiClient } from '@/shared/api'

export async function getAccessibleCourses() {
  const query = {
    populate: {
      courses: {
        populate: ['lessons', 'preview'],
      },
    },
  }
  const response = await apiClient.fetch('/api/users/me', { query })

  const profile: User = response.data

  return profile.courses ?? []
}
