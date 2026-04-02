<script setup lang="ts">
import type { Course } from '../model/interface'

const { course } = defineProps<{ course: Course }>()
const baseApi = import.meta.env.VITE_API_BASE
</script>

<template>
  <div>
    <UAvatar
      :src="baseApi + course.preview?.url"
      class="size-auto aspect-video w-full rounded-lg"
    />

    <h3 class="mt-1">{{ course.title }}</h3>
    <span class="text-sm text-dimmed">{{ course.lessons?.length }} уроков</span>
  </div>
</template>
