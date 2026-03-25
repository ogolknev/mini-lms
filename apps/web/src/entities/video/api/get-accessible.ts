import { apiClient } from '@/shared/api'
import type { Video } from '../model/interface'

export async function getAccessibleVideos() {
  const query = {
    populate: ['course', 'preview'],
  }

  const response = await apiClient.fetch('/api/videos/accessible', { query })

  console.log(response.data)

  const videos: Video[] = response.data.videos

  return videos
}
