import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from './interface'
import { getProfile } from '../api/get-profile'

export const useProfileStore = defineStore('profile', () => {
  const profile = ref<User | null>(null)

  async function get(options?: { clear?: boolean }) {
    if (options?.clear) profile.value = null

    profile.value = profile.value ?? (await getProfile())

    return profile.value
  }

  function set(data: User) {
    profile.value = data
  }

  function clear() {
    profile.value = null
  }

  return {
    profile,
    get,
    clear,
    set,
  }
})
