import { beforeEach, expect, test } from 'vitest'
import { DemoAPIClient } from '../../src/shared/demo/client'
const client = new DemoAPIClient()
beforeEach(() => {
  sessionStorage.clear()
  localStorage.clear()
})
test('requires a demo session and rejects unrelated credentials', async () => {
  await expect(client.fetch('/api/users/me')).rejects.toMatchObject({ response: { status: 401 } })
  await expect(
    client.fetch('/api/auth/local', {
      method: 'POST',
      body: { identifier: 'other', password: 'other' },
    }),
  ).rejects.toThrow('Invalid identifier or password')
})
test('course, lesson and attachment flow stays local and logout revokes session', async () => {
  const auth = await client.fetch('/api/auth/local', {
    method: 'POST',
    body: { identifier: 'demo', password: 'demo' },
  })
  client.setAuthKey(auth.data.jwt)
  const profile = await client.fetch('/api/users/me')
  const id = profile.data.courses[0].documentId
  const course = await client.fetch(`/api/courses/${id}`)
  expect(course.data.data.lessons).toHaveLength(3)
  const lesson = await client.fetch(`/api/lessons/my/${course.data.data.lessons[0].documentId}`)
  expect(lesson.data.data.course.documentId).toBe(id)
  expect(lesson.data.data.attachments[0].url).toContain('/demo/layout-checklist.txt')
  expect(lesson.data.data.heroUrl).toContain('/demo/lesson-demo.mp4')
  expect(localStorage.getItem('auth_key')).toBeNull()
  client.unsetAuthKey()
  await expect(client.fetch(`/api/courses/${id}`)).rejects.toMatchObject({
    response: { status: 401 },
  })
})
test('unknown routes and writes fail; responses cannot mutate fixtures', async () => {
  client.setAuthKey('public-demo-session')
  await expect(client.fetch('/api/lessons/my/missing')).rejects.toMatchObject({
    response: { status: 404 },
  })
  await expect(client.fetch('/api/users/me', { method: 'DELETE' })).rejects.toMatchObject({
    response: { status: 405 },
  })
  const profile = await client.fetch('/api/users/me')
  profile.data.name = 'Changed'
  expect((await client.fetch('/api/users/me')).data.name).toBe('Демо-ученик')
})
