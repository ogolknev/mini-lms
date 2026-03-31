<script setup lang="ts">
import { useCourseStore, type Course } from '@/entities/course'
import { LessonThumbnail } from '@/entities/lesson'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseStore = useCourseStore()

const course = ref<Course | null>(null)
const baseApi = import.meta.env.VITE_API_BASE
const lessons = computed(() => {
  return course.value?.lessons?.slice().sort((l1, l2) => l1.position - l2.position)
})

onMounted(async () => {
  course.value = await courseStore.get(route.params.id as string)
})
</script>

<template>
  <div class="relative space-y-5">
    <UAvatar
      :src="baseApi + course?.preview?.url"
      class="size-auto aspect-video w-full rounded-lg mb-5"
    />

    <div class="flex justify-between gap-2">
      <h2 class="text-xl md:text-2xl font-bold">{{ course?.title }}</h2>

      <USlideover
        title="Видео"
        :description="`Уроки из курса &quot;${course?.title}&quot;`"
        :ui="{ content: 'z-50' }"
      >
        <UButton label="Уроки" class="" trailing-icon="lucide:chevron-right" />

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

    <p>{{ course?.description }}</p>
  </div>
</template>
