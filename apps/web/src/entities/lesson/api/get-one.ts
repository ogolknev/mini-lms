import { apiClient } from '@/shared/api'
import type { Lesson } from '..'

export async function getLesson(id: string) {
  const query = {
    populate: ['preview', 'course', 'attachments'],
  }

  const response = await apiClient.fetch(`/api/lessons/my/${id}`, { query })

  const lesson: Lesson = response.data.data

  return lesson
}
