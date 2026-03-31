import { apiClient } from '@/shared/api'
import type { Course } from '..'

export async function getCourse(id: string) {
  const query = {
    populate: ['lessons.preview', 'preview'],
  }

  const response = await apiClient.fetch(`/api/courses/${id}`, { query })

  const course: Course = response.data.data

  return course
}
