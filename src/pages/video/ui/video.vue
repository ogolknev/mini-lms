<script setup lang="ts">
import { useVideoStore, type Video } from '@/entities/video'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const videoStore = useVideoStore()
const route = useRoute()

const video = ref<Video>()
const url = computed(() => video.value?.url?.replace('video/private', 'play/embed'))

function getDownloadUrl(attachment: NonNullable<Video['attachments']>[number]) {
  return import.meta.env.VITE_API_BASE + attachment.url
}

function getIconFromMime(mime: string) {
  if (mime.startsWith('image')) return 'tabler:photo'
  if (mime.endsWith('pdf')) return 'tabler:file-type-pdf'
  if (mime.endsWith('zip')) return 'tabler:file-zip'
  else return 'tabler:file'
}

onMounted(async () => {
  video.value = await videoStore.get(route.params.id as string)
})
</script>

<template>
  <div class="space-y-5">
    <iframe
      class="size-auto rounded-lg w-full aspect-video"
      :src="url"
      frameBorder="0"
      allow="clipboard-write; autoplay"
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    />

    <div class="space-y-5">
      <div class="flex justify-between">
        <h3 class="text-xl md:text-2xl">{{ video?.title }}</h3>
        <ULink
          class="text-neutral-500"
          @click="$router.push(`/courses/${video?.course?.documentId}`)"
          >ПЕРЕЙТИ К КУРСУ</ULink
        >
      </div>

      <div v-if="video?.attachments">
        <h4 class="text-lg md:text-xl mb-2">Материалы урока</h4>

        <div class="space-y-2 ml-2">
          <div v-for="attachment in video.attachments" :key="attachment.name" class="flex gap-2">
            <UIcon :name="getIconFromMime(attachment.mime)" class="size-5 text-neutral-400"></UIcon>

            <a
              :href="getDownloadUrl(attachment)"
              target="_blank"
              download=""
              class="text-neutral-300 text-sm"
              >{{ attachment.name }}</a
            >
          </div>
        </div>
      </div>

      <USeparator />

      <p>{{ video?.description }}</p>
    </div>
  </div>
</template>
