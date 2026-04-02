<script setup lang="ts">
import { useLessonStore, type Lesson } from '@/entities/lesson'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const lessonStore = useLessonStore()
const route = useRoute()
const toast = useToast()

const lesson = ref<Lesson>()
const lessonContent = ref('')

const isLoading = ref(false)
const isError = ref(false)

function getDownloadUrl(attachment: NonNullable<Lesson['attachments']>[number]) {
  return import.meta.env.VITE_API_BASE + attachment.url
}

function getIconFromMime(mime: string) {
  if (mime.startsWith('image')) return 'tabler:photo'
  if (mime.endsWith('pdf')) return 'tabler:file-type-pdf'
  if (mime.endsWith('zip')) return 'tabler:file-zip'
  else return 'tabler:file'
}

onMounted(async () => {
  try {
    isLoading.value = true

    await lessonStore.update()
    lesson.value = await lessonStore.get(route.params.id as string)

    const mdRenderer = new MarkdownIt({
      html: false,
      linkify: true,
      breaks: true,
    })

    const unsafeHtml = mdRenderer.render(lesson.value?.content || '')
    lessonContent.value = DOMPurify.sanitize(unsafeHtml)

    isError.value = false
  } catch (error) {
    console.error('Failed to load lesson', error)

    const errorMessage = error instanceof Error ? error.message : String(error)

    isError.value = true

    toast.add({
      color: 'error',
      title: 'Не удалось загрузить урок. Попробуйте обновить страницу.',
      description: errorMessage,
      icon: 'lucide:triangle-alert',
    })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div v-if="!isError" class="space-y-5">
    <iframe
      v-if="lesson?.heroSrcType === 'url' && !isLoading"
      class="size-auto rounded-lg w-full aspect-video"
      :src="lesson.heroUrl?.replace('video/private', 'play/embed')"
      frameBorder="0"
      allow="clipboard-write; autoplay"
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    />

    <USkeleton v-else-if="isLoading" class="size-auto rounded-lg w-full aspect-video" />

    <div class="space-y-5">
      <UCard variant="subtle" v-if="!isLoading">
        <template #header>
          <div class="flex justify-between">
            <h3 class="text-2xl md:text-3xl font-bold">{{ lesson?.title }}</h3>
            <ULink
              class="text-neutral-500"
              @click="$router.push(`/courses/${lesson?.course?.documentId}`)"
              >ПЕРЕЙТИ К КУРСУ</ULink
            >
          </div>
        </template>

        <template #default>
          <p>{{ lesson?.description }}</p>
        </template>

        <template #footer v-if="lesson?.attachments">
          <div class="flex flex-col">
            <UButton
              v-for="attachment in lesson.attachments"
              :key="attachment.name"
              :href="getDownloadUrl(attachment)"
              target="_blank"
              download=""
              variant="link"
              color="neutral"
              :icon="getIconFromMime(attachment.mime)"
              >{{ attachment.name }}</UButton
            >
          </div>
        </template>
      </UCard>

      <USkeleton v-else class="w-full h-40" />

      <div
        v-if="lessonContent"
        v-html="lessonContent"
        class="prose prose-neutral dark:prose-invert max-w-none mt-15"
      ></div>
    </div>
  </div>

  <UEmpty
    v-else
    title="Не удалось загрузить урок"
    description="Попробуйте обновить страницу"
    icon="lucide:triangle-alert"
  />
</template>
