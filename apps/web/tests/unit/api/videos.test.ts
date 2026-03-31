import { login } from '../../../src/features/login'
import { getAccessibleVideos, getVideo } from '../../../src/entities/video'
import { expect, test, describe } from 'vitest'

describe('api test', () => {
  test('get accessible videos', async () => {
    await login({ identifier: 'test', password: 'testtest' })

    const response = await getAccessibleVideos()

    expect(response[0]).toHaveProperty('url')
  })

  test('get accessible video', async () => {
    await login({ identifier: 'test', password: 'testtest' })

    const response = await getVideo('m4wv2laswj7bdnrl8zv9v3ti')

    expect(response).toHaveProperty('url')
  })

  test('get inaccessible video', async () => {
    await login({ identifier: 'test', password: 'testtest' })

    const response = getVideo('pwqmhfxxtaphb3xlmng8lqws')

    await expect(response).rejects.toThrow('Policy Failed')
  })
})
