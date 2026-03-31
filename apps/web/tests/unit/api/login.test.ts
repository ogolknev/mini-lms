import { login } from '../../../src/features/login'
import { expect, test, describe } from 'vitest'

describe('api test', () => {
  test('login', async () => {
    const response = await login({ identifier: 'test', password: 'testtest' })

    expect(response).toHaveProperty('jwt')
    expect(response).toHaveProperty('user')
  })

  test('login with wrong credentials', async () => {
    const response = login({ identifier: 'tesasdt', password: 'testtadfasfest' })

    await expect(response).rejects.toThrow('Invalid identifier or password')
  })
})
