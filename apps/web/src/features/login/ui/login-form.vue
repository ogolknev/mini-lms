<script setup lang="ts">
import type { FormSubmitEvent } from '@nuxt/ui/runtime/types/form.js'
import { ref } from 'vue'
import zod from 'zod'
import { login } from '../api/login'
import { HTTPError } from '@/shared/api'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/entities/user'

const toasts = useToast()
const router = useRouter()
const profileStore = useProfileStore()

const schema = zod.object({
  identifier: zod.string().nonempty('Обязательное поле'),
  password: zod.string().nonempty('Обязательное поле'),
})
const showPassword = ref(false)

type Schema = zod.infer<typeof schema>

const state = ref<Schema>({
  identifier: '',
  password: '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await login(event.data)

    await profileStore.get({ clear: true })

    router.push('/')
  } catch (error) {
    if (error instanceof HTTPError) {
      if (error.response?.data.error.message === 'Invalid identifier or password') {
        toasts.add({
          title: 'Ошибка входа',
          description: 'Не верный логин или пароль',
          color: 'error',
          icon: 'lucide:triangle-alert',
        })
      }
    }
  }
}
</script>

<template>
  <UForm :state :schema class="space-y-2" @submit="onSubmit">
    <UFormField label="Имя пользователя или email" name="identifier">
      <UInput v-model="state.identifier" class="w-full" />
    </UFormField>

    <UFormField label="Пароль" name="password">
      <UInput v-model="state.password" class="w-full" :type="showPassword ? 'text' : 'password'">
        <template #trailing>
          <UButton
            :icon="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
            @click="showPassword = !showPassword"
            variant="link"
            color="neutral"
            size="sm"
          />
        </template>
      </UInput>
    </UFormField>

    <div class="flex justify-end mt-4">
      <UButton type="submit" label="Войти" />
    </div>
  </UForm>
</template>
