import { defineStore } from 'pinia'
import type { Video } from './interface'
import { computed, ref } from 'vue'
import { getAccessibleVideos } from '../api/get-accessible'
import { getVideo } from '../api/get-one'

export const useVideoStore = defineStore('video', () => {
  const videoMap = ref<Map<string, Video>>(new Map())
  const videos = computed(() => {
    return Array.from(videoMap.value.values()).sort((v1, v2) => v1.order - v2.order)
  })

  async function update(videos?: Video[], options?: { clear?: boolean }) {
    if (options?.clear) {
      videoMap.value.clear()
    }

    videos = videos ?? (await getAccessibleVideos())

    videos.forEach((video) => {
      videoMap.value.set(video.documentId, video)
    })
  }

  async function get(id: string) {
    const video = await getVideo(id)

    videoMap.value.set(video.documentId, video)

    return video
  }

  return {
    videos,
    update,
    get,
  }
})
