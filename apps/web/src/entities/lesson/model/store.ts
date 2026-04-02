import { defineStore } from 'pinia'
import type { Lesson } from './interface'
import { computed, ref } from 'vue'
import { getLesson } from '../api/get-one'
import { getAccessibleLessons } from '../api/get-accessible'

export const useLessonStore = defineStore('lesson', () => {
  const lessonsMap = ref<Map<string, Lesson>>(new Map())
  const lessons = computed(() => {
    return Array.from(lessonsMap.value.values())
  })
  const isLoading = ref(false)

  async function update(lessons?: Lesson[], options?: { clear?: boolean }) {
    if (isLoading.value) {
      return
    }

    try {
      isLoading.value = true

      if (options?.clear) {
        lessonsMap.value.clear()
      }

      const lessonsToStore = lessons ?? (await getAccessibleLessons())

      lessonsToStore.forEach((lesson) => {
        lessonsMap.value.set(lesson.documentId, lesson)
      })
    } finally {
      isLoading.value = false
    }
  }

  async function get(id: string) {
    return await getLesson(id)
  }

  return {
    lessons,
    isLoading,
    update,
    get,
  }
})
