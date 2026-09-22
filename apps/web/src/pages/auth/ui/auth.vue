<script setup lang="ts">
import { LoginForm } from '@/features/login'
const isDemo = import.meta.env.VITE_DEMO === 'true'
</script>

<template>
  <div class="size-full flex justify-center items-center">
    <div class="w-full max-w-96 bg-elevated p-6 rounded-lg border border-default">
      <h2 class="text-2xl font-bold mb-4">{{ isDemo ? 'Кабинет ученика' : 'Вход' }}</h2>

      <LoginForm />
    </div>
  </div>
</template>
