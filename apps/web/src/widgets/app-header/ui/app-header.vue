<script setup lang="ts">
import { useProfileStore } from '@/entities/user'
import { logout } from '@/features/logout'
import BrandIconWithText from '@/shared/assets/brand-icon-with-text.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const isDemo = import.meta.env.VITE_DEMO === 'true'
const profileStore = useProfileStore()
const router = useRouter()

const openProfilePopover = ref(false)

onMounted(async () => {
  if (isDemo && router.currentRoute.value.path === '/auth') return
  try {
    await profileStore.get({ clear: true })
  } catch {
    console.error('Failed to fetch profile')
  }
})

function onLogout() {
  profileStore.clear()
  logout()
  router.push('/auth')
  openProfilePopover.value = false
}
</script>

<template>
  <UHeader :toggle="false">
    <template #title>
      <BrandIconWithText class="h-10" />
    </template>

    <template #right>
      <UBadge v-if="isDemo" label="Демо" variant="subtle" />
      <UColorModeButton />

      <UPopover
        v-if="profileStore.profile"
        v-model:open="openProfilePopover"
        arrow
        :ui="{
          content: 'z-100',
        }"
        :content="{
          side: 'bottom',
          align: 'end',
        }"
      >
        <UButton icon="lucide:user" aria-label="Профиль ученика" color="neutral" variant="subtle" />

        <template #content>
          <div class="p-5 flex flex-col gap-5">
            {{ profileStore.profile?.name }}

            <UButton label="Выйти" icon="lucide:log-out" @click="onLogout" />
          </div>
        </template>
      </UPopover>
    </template>
  </UHeader>
</template>
