<script setup lang="ts">
import { useProfileStore } from '@/entities/user'
import { logout } from '@/features/logout'
import BrandIconWithText from '@/shared/assets/brand-icon-with-text.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()
const router = useRouter()

const openProfilePopover = ref(false)

onMounted(async () => {
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
        <UButton icon="lucide:user" color="neutral" variant="subtle" />

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
