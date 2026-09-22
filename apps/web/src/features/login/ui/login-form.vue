<script setup lang="ts">
import { useToast } from '@nuxt/ui/composables'
import type { FormSubmitEvent } from '@nuxt/ui/runtime/types/form.js'
import { ref } from 'vue'
import zod from 'zod'
import { login } from '../api/login'
import { HTTPError } from '@/shared/api'
import { useRouter } from 'vue-router'
import { useProfileStore } from '@/entities/user'

const isDemo = import.meta.env.VITE_DEMO === 'true'
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
  identifier: isDemo ? 'demo' : '',
  password: isDemo ? 'demo' : '',
})

const loading = ref(false)

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    loading.value = true

    await login(event.data)

    await profileStore.get({ clear: true })

    router.push('/')
  } catch (error) {
    const invalid =
      error instanceof HTTPError &&
      error.response?.data.error.message === 'Invalid identifier or password'
    toasts.add({
      title: 'Ошибка входа',
      description: invalid ? 'Неверный логин или пароль' : 'Не удалось войти. Попробуйте ещё раз.',
      color: 'error',
      icon: 'lucide:triangle-alert',
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UForm :state :schema class="space-y-2" @submit="onSubmit">
    <p v-if="isDemo" class="text-sm text-muted mb-4">
      Тестовый аккаунт уже заполнен. Можно сразу войти и посмотреть курс.
    </p>
    <UFormField label="Имя пользователя или email" name="identifier">
      <UInput v-model="state.identifier" class="w-full" />
    </UFormField>

    <UFormField label="Пароль" name="password">
      <UInput v-model="state.password" class="w-full" :type="showPassword ? 'text' : 'password'">
        <template #trailing>
          <UButton
            :aria-label="showPassword ? 'Скрыть пароль' : 'Показать пароль'"
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
      <UButton type="submit" :label="isDemo ? 'Открыть демо' : 'Войти'" :loading="loading" />
    </div>
  </UForm>
</template>
