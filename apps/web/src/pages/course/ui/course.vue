<script setup lang="ts">
import { useCourseStore, type Course } from '@/entities/course'
import { LessonThumbnail } from '@/entities/lesson'
import { HTTPError } from '@/shared/api'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseStore = useCourseStore()
const toast = useToast()

const course = ref<Course | null>(null)
const baseApi = import.meta.env.VITE_API_BASE
const lessons = computed(() => {
  return course.value?.lessons?.slice().sort((l1, l2) => l1.position - l2.position)
})

const isLoading = ref(false)
const isError = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true

    course.value = await courseStore.get(route.params.id as string)
    isError.value = false
  } catch (error) {
    console.error('Failed to load course', error)

    if (error instanceof HTTPError && error.response?.status === 403) {
      toast.add({
        color: 'error',
        title: 'У вас нет доступа к этому курсу.',
        icon: 'lucide:shield-alert',
      })
      return
    }

    const errorMessage = error instanceof Error ? error.message : String(error)

    toast.add({
      color: 'error',
      title: 'Не удалось загрузить курс. Попробуйте обновить страницу.',
      description: errorMessage,
      icon: 'lucide:triangle-alert',
    })

    isError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="!isError" class="relative space-y-5">
    <UAvatar
      v-if="!isLoading"
      :src="baseApi + course?.preview?.url"
      class="size-auto aspect-video w-full rounded-lg mb-5"
    />
    <USkeleton v-else class="size-auto aspect-video w-full rounded-lg mb-5" />

    <div class="flex justify-between gap-2">
      <h2 v-if="!isLoading" class="text-xl md:text-2xl font-bold">{{ course?.title }}</h2>
      <USkeleton v-else class="w-full h-8" />

      <USlideover
        :title="course?.title"
        :description="`${course?.lessons?.length ?? 0} уроков`"
        :ui="{ content: 'z-50' }"
      >
        <UButton label="Уроки" class="" trailing-icon="lucide:chevron-right" :loading="isLoading" />

        <template #body>
          <div class="space-y-5">
            <LessonThumbnail
              v-for="lesson in lessons"
              :key="lesson.documentId"
              :lesson
              class="transition-transform hover:scale-102 cursor-pointer"
              @click="$router.push(`/lessons/${lesson.documentId}`)"
            />
          </div>
        </template>
      </USlideover>
    </div>

    <USeparator />

    <p v-if="!isLoading">{{ course?.description }}</p>
    <USkeleton v-else class="w-full h-20" />
  </div>
  <UEmpty
    v-else
    title="Не удалось загрузить курс"
    description="Попробуйте обновить страницу"
    icon="lucide:triangle-alert"
  />
</template>
