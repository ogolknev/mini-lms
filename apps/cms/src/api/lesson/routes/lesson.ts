/**
 * lesson router
 */

import { factories } from '@strapi/strapi'

const defaultRouter = factories.createCoreRouter('api::lesson.lesson')

const customRoutes = [
  {
    method: 'GET',
    path: '/lessons/my',
    handler: 'lesson.find',
    config: {
      middlewares: ['api::lesson.scope-my-lessons'],
    },
  },
  {
    method: 'GET',
    path: '/lessons/my/:id',
    handler: 'lesson.findMyOne',
    config: {
      middlewares: ['api::lesson.ensure-my-lesson-access'],
    },
  },
]

export default {
  get prefix() {
    return defaultRouter.prefix
  },
  get routes() {
    const coreRoutes =
      typeof defaultRouter.routes === 'function' ? defaultRouter.routes() : defaultRouter.routes

    return [...customRoutes, ...coreRoutes]
  },
}
