<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
</script>

<template>
  <UApp>
    <div class="h-dvh w-dvw grid grid-rows-[auto_minmax(0,1fr)]">
      <AppHeader />
      <main class="w-full min-w-0 max-w-280 mx-auto px-4 sm:px-8 mt-8 pb-10">
        <RouterView />
      </main>
    </div>
  </UApp>
</template>
