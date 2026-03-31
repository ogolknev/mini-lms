import { apiClient } from '@/shared/api'
import type { Lesson } from '..'

export async function getAccessibleLessons() {
  const query = {
    populate: ['preview', 'course', 'attachments'],
  }

  const response = await apiClient.fetch('/api/lessons/my', { query })

  const lessons: Lesson[] = response.data.data ?? []

  return lessons
}
