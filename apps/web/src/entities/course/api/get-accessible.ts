import type { User } from '@/entities/user'
import { apiClient } from '@/shared/api'

export async function getAccessibleCourses() {
  const query = {
    populate: {
      student: {
        populate: {
          courses: {
            populate: ['videos', 'preview'],
          },
        },
      },
    },
  }
  const response = await apiClient.fetch('/api/users/me', { query })

  const profile: User = response.data

  return profile.student?.courses ?? []
}
