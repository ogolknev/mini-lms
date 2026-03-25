<script setup lang="ts">
import { CourseThumbnail, useCourseStore } from '@/entities/course'
import { VideoThumbnail } from '@/entities/video'
import { useVideoStore } from '@/entities/video'
import { onMounted } from 'vue'

const videoStore = useVideoStore()
const courseStore = useCourseStore()

onMounted(async () => {
  await videoStore.update()
  await courseStore.update()
})

function scrollHorizontally(event: Event) {
  if (event instanceof WheelEvent) {
    event.preventDefault()

    const target = event.currentTarget as HTMLElement

    target.scrollBy({
      left: event.deltaY * 1.5,
      behavior: 'smooth',
    })
  }
}

function enableHorizontalScroll(event: MouseEvent) {
  const container = event.target
  container?.addEventListener('wheel', scrollHorizontally)
}

function disableHorizontalScroll(event: MouseEvent) {
  const container = event.target
  container?.removeEventListener('wheel', scrollHorizontally)
}
</script>

<template>
  <div>
    <div class="mb-5">
      <h2 class="text-2xl font-bold mb-2">Ваши уроки</h2>

      <div
        class="flex gap-4 overflow-auto p-2 scrollbar-hidden"
        @mouseenter="enableHorizontalScroll"
        @mouseleave="disableHorizontalScroll"
      >
        <VideoThumbnail
          v-for="video in videoStore.videos"
          :key="video.documentId"
          :video
          class="w-60 transition-transform hover:scale-105 cursor-pointer shrink-0"
          @click="$router.push({ path: `/videos/${video.documentId}` })"
        />
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-2">Ваши курсы</h2>

      <div
        class="flex gap-4 overflow-auto p-2 scrollbar-hidden"
        @mouseenter="enableHorizontalScroll"
        @mouseleave="disableHorizontalScroll"
      >
        <CourseThumbnail
          v-for="course in courseStore.courses"
          :key="course.documentId"
          :course
          class="w-80 transition-transform hover:scale-105 cursor-pointer shrink-0"
          @click="$router.push({ path: `/courses/${course.documentId}` })"
        />
      </div>
    </div>
  </div>
</template>
