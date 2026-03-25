<script setup lang="ts">
import { useProfileStore } from '@/entities/user'
import { logout } from '@/features/logout'
import { AppLogo } from '@/shared/assets'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()
const router = useRouter()

const openProfilePopover = ref(false)

onMounted(async () => {
  await profileStore.get({ clear: true })
})

function onLogout() {
  profileStore.clear()
  logout()
  router.push('/auth')
  openProfilePopover.value = false
}
</script>

<template>
  <header
    class="h-15 z-40 border-b flex items-center justify-between px-5 border-neutral-800 sticky top-0 bg-neutral-900 mb-5"
  >
    <div class="flex gap-4 items-center">
      <UAvatar :src="AppLogo" class="size-8" />
      <h1 class="text-3xl cursor-pointer" @click="$router.push('/')">ПАРИЖКАЯ ШКОЛА СТИЛИСТОВ</h1>
    </div>

    <UPopover v-if="profileStore.profile" v-model:open="openProfilePopover">
      <UAvatar icon="lucide:user" class="cursor-pointer" />

      <template #content>
        <div class="p-5 flex flex-col gap-5">
          {{ profileStore.profile?.student?.name }}

          <UButton label="Выйти" icon="lucide:log-out" @click="onLogout" />
        </div>
      </template>
    </UPopover>
  </header>
</template>
