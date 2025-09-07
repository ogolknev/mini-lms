<script setup lang="ts">
import { useCourseStore, type Course } from '@/entities/course'
import { VideoThumbnail } from '@/entities/video'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const courseStore = useCourseStore()

const course = ref<Course | null>(null)
const baseApi = import.meta.env.VITE_API_BASE
const videos = computed(() => {
  return course.value?.videos?.slice().sort((v1, v2) => v1.order - v2.order)
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
            <VideoThumbnail
              v-for="video in videos"
              :key="video.documentId"
              :video
              class="transition-transform hover:scale-102 cursor-pointer"
              @click="$router.push(`/videos/${video.documentId}`)"
            />
          </div>
        </template>
      </USlideover>
    </div>

    <USeparator />

    <p>{{ course?.description }}</p>
  </div>
</template>
