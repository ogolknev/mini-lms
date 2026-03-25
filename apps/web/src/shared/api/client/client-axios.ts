import type { AxiosInstance, CreateAxiosDefaults } from 'axios'
import { HTTPError, type APIClient, type FetchOptions, type HTTPResponse } from './interface'
import axios, { AxiosError } from 'axios'
import qs from 'qs'
import { router } from '@/app/router'

export class APIClientAxios implements APIClient {
  axios: AxiosInstance

  setAuthKey(key: string): void {
    this.axios.defaults.headers.common.Authorization = `Bearer ${key}`
    localStorage.setItem('auth_key', key)
  }
  unsetAuthKey(): void {
    delete this.axios.defaults.headers.common.Authorization
    localStorage.removeItem('auth_key')
  }
  async fetch(url: string, options?: FetchOptions): Promise<HTTPResponse> {
    try {
      const { method, body: data, query: params } = options ?? {}
      const response = await this.axios({ method, data, params, url })
      return response
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          if (error.response.status === 403) {
            router.push('/auth')
          }

          if (error.response.status === 401) {
            router.push('/auth')
          }

          console.dir(error.response)
          throw new HTTPError(
            error.response.statusText + ': ' + error.response.data.error.message,
            error.response,
          )
        } else if (error.request) {
          console.dir(error.request)
          throw new HTTPError('No response: ' + error.message)
        }
      }

      throw error
    }
  }

  constructor(options?: CreateAxiosDefaults) {
    this.axios = axios.create({
      paramsSerializer: (params) => qs.stringify(params, { encodeValuesOnly: true }),
      ...options,
    })

    const authKey = localStorage.getItem('auth_key')

    if (authKey) this.setAuthKey(authKey)
  }
}
