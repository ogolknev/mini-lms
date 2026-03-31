import { apiClient } from '@/shared/api'

export function logout() {
  apiClient.unsetAuthKey()
}
