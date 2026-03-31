<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Lesson } from '../model/interface'
import { useLessonStore } from '../model/store'

const lessonStore = useLessonStore()

const { lesson } = defineProps<{ lesson: Lesson }>()
const preview = ref<string | null>(null)

onMounted(async () => {
  preview.value =
    import.meta.env.VITE_API_BASE +
    (lesson.preview?.url ?? (await lessonStore.get(lesson.documentId)).preview?.url ?? null)
})
</script>

<template>
  <div>
    <UAvatar :src="preview ?? undefined" class="size-auto aspect-video w-full rounded-lg" />

    <h3 class="mt-1">{{ lesson.title }}</h3>
  </div>
</template>
