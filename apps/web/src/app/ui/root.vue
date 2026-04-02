<script setup lang="ts">
import { AppHeader } from '@/widgets/app-header'
</script>

<template>
  <UApp>
    <div class="h-dvh w-dvw grid grid-rows-[auto_minmax(0,1fr)]">
      <AppHeader />
      <main class="size-full w-8/10 max-w-280 mx-auto mt-10">
        <RouterView />
      </main>
    </div>
  </UApp>
</template>
