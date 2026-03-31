import Strapi from '@strapi/strapi'

type QueryFilters = Record<string, unknown>

const scopeMyLessons: Strapi.Core.MiddlewareFactory = (_config, { strapi }) => {
  return async (ctx, next) => {
    const userId = ctx.state?.user?.id

    if (!userId) {
      return ctx.unauthorized()
    }

    const enrolledCourses = await strapi.db.query('api::course.course').findMany({
      select: ['id'],
      where: {
        enrolled_users: {
          id: userId,
        },
      },
    })

    const enrolledCourseIds = enrolledCourses.map((course) => course.id)

    const scopedFilter: QueryFilters = {
      course: {
        id: {
          $in: enrolledCourseIds.length > 0 ? enrolledCourseIds : [-1],
        },
      },
    }

    const query = (ctx.query ?? {}) as QueryFilters
    const existingFilters = query.filters as QueryFilters | undefined

    ctx.query = {
      ...query,
      filters: existingFilters
        ? {
            $and: [existingFilters, scopedFilter],
          }
        : scopedFilter,
    }

    await next()
  }
}

export default scopeMyLessons
