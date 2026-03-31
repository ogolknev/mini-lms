<script setup lang="ts">
import { useLessonStore, type Lesson } from '@/entities/lesson'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const lessonStore = useLessonStore()
const route = useRoute()

const lesson = ref<Lesson>()
const lessonContent = ref('')

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
  lesson.value = await lessonStore.get(route.params.id as string)

  const mdRenderer = new MarkdownIt({
    html: false,
    linkify: true,
    breaks: true,
  })

  const unsafeHtml = mdRenderer.render(lesson.value?.content || '')
  lessonContent.value = DOMPurify.sanitize(unsafeHtml)
})
</script>

<template>
  <div class="space-y-5">
    <iframe
      v-if="lesson?.heroSrcType === 'url'"
      class="size-auto rounded-lg w-full aspect-video"
      :src="lesson.heroUrl?.replace('video/private', 'play/embed')"
      frameBorder="0"
      allow="clipboard-write; autoplay"
      webkitAllowFullScreen
      mozallowfullscreen
      allowFullScreen
    />

    <div class="space-y-5">
      <UCard variant="subtle">
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
          <div class="space-y-2">
            <div
              v-for="attachment in lesson.attachments"
              :key="attachment.name"
              class="flex gap-2 group cursor-pointer w-fit"
            >
              <UIcon
                :name="getIconFromMime(attachment.mime)"
                class="size-5 text-neutral-500 group-hover:text-neutral-400"
              ></UIcon>

              <a
                :href="getDownloadUrl(attachment)"
                target="_blank"
                download=""
                class="text-neutral-400 text-sm group-hover:text-neutral-300"
                >{{ attachment.name }}</a
              >
            </div>
          </div>
        </template>
      </UCard>

      <div
        v-if="lessonContent"
        v-html="lessonContent"
        class="prose prose-neutral dark:prose-invert max-w-none mt-15"
      ></div>
    </div>
  </div>
</template>
