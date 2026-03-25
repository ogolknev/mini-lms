import { login } from '../../../src/features/login'
import { getAccessibleCourses, getCourse } from '../../../src/entities/course'
import { expect, test, describe } from 'vitest'

describe('api test', () => {
  test('get accessible courses', async () => {
    await login({ identifier: 'test', password: 'testtest' })

    const response = await getAccessibleCourses()

    expect(response[0]).toHaveProperty('preview')
  })

  test('get accessible course', async () => {
    await login({ identifier: 'test', password: 'testtest' })

    const response = await getCourse('jovkdbh8zsbaoln45ohrbl61')

    expect(response).toHaveProperty('videos')
    expect(response).toHaveProperty('preview')
  })
})
