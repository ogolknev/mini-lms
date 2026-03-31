/* eslint-disable @typescript-eslint/no-explicit-any */
export interface APIClient {
  setAuthKey(key: string): void
  unsetAuthKey(): void
  fetch(url: string, options?: FetchOptions): Promise<HTTPResponse>
}

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT'
  body?: object | FormData
  query?: object
}

export interface HTTPResponse {
  request?: any
  data: any
  status: number
  statusText: string
}

export class HTTPError extends Error {
  response?: HTTPResponse

  constructor(message: string, response?: HTTPResponse) {
    super(message)
    this.response = response
  }
}
