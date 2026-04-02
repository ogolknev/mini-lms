<script setup lang="ts">
import { CourseThumbnail, useCourseStore } from '@/entities/course'
import { LessonThumbnail } from '@/entities/lesson'
import { useLessonStore } from '@/entities/lesson'
import type { Lesson } from '@/entities/lesson/model/interface'
import { HTTPError } from '@/shared/api'
import { computed, onMounted, ref } from 'vue'

const lessonStore = useLessonStore()
const courseStore = useCourseStore()
const toast = useToast()

const isLoading = ref(false)
const isError = ref(false)

const sortedLessons = computed(() =>
  [...lessonStore.lessons].sort((a: Lesson, b: Lesson) => {
    const courseA = a.course?.documentId ?? ''
    const courseB = b.course?.documentId ?? ''

    if (courseA !== courseB) {
      return courseA.localeCompare(courseB)
    }

    return a.position - b.position
  }),
)

onMounted(async () => {
  try {
    isLoading.value = true

    await Promise.all([lessonStore.update(), courseStore.update()])

    isError.value = false
  } catch (error) {
    console.error('Update failed', error)

    if (error instanceof HTTPError && error.response?.status === 403) {
      return
    }

    const errorMessage = error instanceof Error ? error.message : String(error)

    isError.value = true

    toast.add({
      color: 'error',
      title: 'Не удалось загрузить ваши уроки и курсы. Попробуйте обновить страницу.',
      description: errorMessage,
      icon: 'lucide:triangle-alert',
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div>
    <div class="mb-5">
      <h2 class="mb-2 text-2xl font-bold">Ваши уроки</h2>

      <template v-if="!isLoading">
        <UCarousel
          v-if="sortedLessons.length !== 0"
          :items="sortedLessons"
          arrows
          prev-icon="lucide:chevron-left"
          next-icon="lucide:chevron-right"
          skip-snaps
          wheel-gestures
          :ui="{
            container: 'gap-2 p-4',
            item: 'basis-60',
            controls: 'justify-end mt-3',
            arrows: '[&>button:disabled]:hidden',
          }"
        >
          <template #default="{ item: lesson }">
            <LessonThumbnail
              :lesson
              class="cursor-pointer transition-transform hover:scale-105"
              @click="$router.push({ path: `/lessons/${lesson.documentId}` })"
            />
          </template>
        </UCarousel>

        <UEmpty
          v-else
          :title="isError ? 'Не удалось загрузить ваши уроки' : 'У вас нет доступных уроков'"
          :description="isError ? 'Попробуйте обновить страницу' : ''"
          :icon="isError ? 'lucide:triangle-alert' : 'lucide:frown'"
        />
      </template>
      <div v-else class="flex gap-4 overflow-hidden p-2">
        <div v-for="_ of 5" :key="_" class="h-40 w-60 shrink-0 rounded-lg">
          <USkeleton class="size-full" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="mb-2 text-2xl font-bold">Ваши курсы</h2>

      <template v-if="!isLoading">
        <UCarousel
          v-if="courseStore.courses.length !== 0"
          :items="courseStore.courses"
          arrows
          prev-icon="lucide:chevron-left"
          next-icon="lucide:chevron-right"
          skip-snaps
          wheel-gestures
          :ui="{
            container: 'gap-2 p-4',
            item: 'basis-80',
            controls: 'justify-end mt-3',
            arrows: '[&>button:disabled]:hidden',
          }"
        >
          <template #default="{ item: course }">
            <CourseThumbnail
              :course
              class="cursor-pointer transition-transform hover:scale-105"
              @click="$router.push({ path: `/courses/${course.documentId}` })"
            />
          </template>
        </UCarousel>

        <UEmpty
          v-else
          :title="isError ? 'Не удалось загрузить ваши курсы' : 'Вы не зачислены ни на один курс'"
          :description="isError ? 'Попробуйте обновить страницу' : ''"
          :icon="isError ? 'lucide:triangle-alert' : 'lucide:frown'"
        />
      </template>
      <div v-else class="flex gap-4 overflow-hidden p-2">
        <div v-for="_ of 5" :key="_" class="h-40 w-80 shrink-0 rounded-lg">
          <USkeleton class="size-full" />
        </div>
      </div>
    </div>
  </div>
</template>
