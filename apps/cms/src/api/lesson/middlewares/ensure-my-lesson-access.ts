import Strapi from '@strapi/strapi'

type RouteContext = {
  params?: { id?: string }
  state?: { user?: { id?: number } }
}

const ensureMyLessonAccess: Strapi.Core.MiddlewareFactory = (_config, { strapi }) => {
  return async (context, next) => {
    const ctx = context as typeof context & RouteContext
    const userId = ctx.state?.user?.id
    const documentId = ctx.params?.id

    if (!userId || !documentId) {
      return ctx.notFound()
    }

    const lesson = await strapi.documents('api::lesson.lesson').findOne({
      documentId,
      fields: ['documentId'],
      filters: {
        course: {
          enrolled_users: {
            id: {
              $eq: userId,
            },
          },
        },
      },
    })

    if (!lesson) {
      return ctx.notFound()
    }

    await next()
  }
}

export default ensureMyLessonAccess
