import {
  HTTPError,
  type APIClient,
  type FetchOptions,
  type HTTPResponse,
} from '../api/client/interface'
import { createDemoData } from './data'
import { demoSessionKey } from './config'

const response = (data: unknown): HTTPResponse => ({
  data: structuredClone(data),
  status: 200,
  statusText: 'OK',
})
const failure = (status: number, message: string) =>
  new HTTPError(message, {
    data: { error: { message } },
    status,
    statusText: message,
  })

/** In-memory showcase only. Never used by a normal production build. */
export class DemoAPIClient implements APIClient {
  private data = createDemoData()
  setAuthKey(key: string) {
    sessionStorage.setItem(demoSessionKey, key)
  }
  unsetAuthKey() {
    sessionStorage.removeItem(demoSessionKey)
  }
  async fetch(url: string, options?: FetchOptions): Promise<HTTPResponse> {
    const { demoCourse, demoLessons, demoUser } = this.data
    if (url === '/api/auth/local' && options?.method === 'POST') {
      const credentials = options.body as { identifier?: string; password?: string }
      if (credentials?.identifier !== 'demo' || credentials?.password !== 'demo') {
        throw failure(400, 'Invalid identifier or password')
      }
      return response({ jwt: 'public-demo-session', user: demoUser })
    }
    if (!sessionStorage.getItem(demoSessionKey)) throw failure(401, 'Войдите в демо')
    if (options?.method && options.method !== 'GET')
      throw failure(405, 'Демо доступно только для просмотра')
    if (url === '/api/users/me') return response(demoUser)
    if (url === '/api/lessons/my') return response({ data: demoLessons })
    if (url === `/api/courses/${demoCourse.documentId}`) return response({ data: demoCourse })
    const lesson = demoLessons.find((item) => url === `/api/lessons/my/${item.documentId}`)
    if (lesson) return response({ data: lesson })
    throw failure(404, 'Материал не найден')
  }
}
