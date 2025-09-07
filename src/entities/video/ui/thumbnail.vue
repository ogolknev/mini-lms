<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Video } from '../model/interface'
import { useVideoStore } from '../model/store'

const videoStore = useVideoStore()

const { video } = defineProps<{ video: Video }>()
const preview = ref<string | null>(null)

onMounted(async () => {
  preview.value =
    import.meta.env.VITE_API_BASE +
    (video.preview?.url ?? (await videoStore.get(video.documentId)).preview?.url ?? null)
})
</script>

<template>
  <div>
    <UAvatar :src="preview ?? undefined" class="size-auto aspect-video w-full rounded-lg" />

    <h3 class="mt-1">{{ video.title }}</h3>
  </div>
</template>
