import { login } from '../../../src/features/login'
import { getProfile } from '../../../src/entities/user'
import { expect, test, describe } from 'vitest'

describe('api test', () => {
  test('get profile', async () => {
    await login({ identifier: 'test', password: 'testtest' })

    const response = await getProfile()

    expect(response).toHaveProperty('student')
  })
})
