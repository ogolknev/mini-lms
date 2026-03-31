<script setup lang="ts">
import { LoginForm } from '@/features/login'
</script>

<template>
  <div class="size-full flex justify-center items-center">
    <div class="w-8/10 max-w-80 bg-neutral-800/50 p-6 rounded-lg border border-neutral-700">
      <h2 class="text-2xl font-bold mb-4">Вход</h2>

      <LoginForm />
    </div>
  </div>
</template>
