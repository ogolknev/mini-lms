import { apiClient } from '@/shared/api'
import type { Video } from '../model/interface'

export async function getVideo(id: string) {
  const query = {
    populate: ['course', 'preview', 'attachments'],
  }

  const response = await apiClient.fetch(`/api/videos/${id}/url`, { query })

  const video: Video = response.data

  return video
}
