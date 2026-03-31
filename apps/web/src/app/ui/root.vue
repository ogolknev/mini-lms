<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
import { useColorMode } from '@nuxt/ui/runtime/vue/stubs.js'

const mode = useColorMode()
mode.preference = 'dark'
</script>

<template>
  <UApp>
    <div class="h-dvh w-dvw grid grid-rows-[auto_minmax(0,1fr)]">
      <AppHeader />
      <main class="size-full w-8/10 max-w-250 mx-auto">
        <RouterView />
      </main>
    </div>
  </UApp>
</template>
