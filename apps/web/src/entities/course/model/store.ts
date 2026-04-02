import { defineStore } from 'pinia'
import type { Course } from './interface'
import { computed, ref } from 'vue'
import { getAccessibleCourses } from '../api/get-accessible'
import { getCourse } from '../api/get-one'

export const useCourseStore = defineStore('course', () => {
  const coursesMap = ref<Map<string, Course>>(new Map())
  const courses = computed(() => {
    return Array.from(coursesMap.value.values())
  })
  const isLoading = ref(false)

  async function update(courses?: Course[], options?: { clear?: boolean }) {
    if (isLoading.value) {
      return
    }

    try {
      isLoading.value = true

      if (options?.clear) {
        coursesMap.value.clear()
      }

      courses = courses ?? (await getAccessibleCourses())

      courses.forEach((course) => {
        coursesMap.value.set(course.documentId, course)
      })
    } finally {
      isLoading.value = false
    }
  }

  async function get(id: string) {
    const course = coursesMap.value.get(id) ?? (await getCourse(id))

    coursesMap.value.set(course.documentId, course)

    return course
  }

  return {
    courses,
    isLoading,
    update,
    get,
  }
})
