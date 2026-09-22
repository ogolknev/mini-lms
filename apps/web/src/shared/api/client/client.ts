import type { APIClient } from './interface'
import { APIClientAxios } from './client-axios'
import { DemoAPIClient } from '../../demo/client'

export const apiClient: APIClient =
  import.meta.env.VITE_DEMO === 'true'
    ? new DemoAPIClient()
    : new APIClientAxios({
        baseURL: import.meta.env.VITE_API_BASE,
        timeout: 5000,
      })
