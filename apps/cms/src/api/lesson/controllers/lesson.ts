/**
 * lesson controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::lesson.lesson', ({ strapi }) => ({
  async findMyOne(ctx) {
    const id = ctx.params.id

    const lesson = await strapi.db.query('api::lesson.lesson').findOne({
      where: { documentId: id },
      populate: ['preview', 'course', 'attachments'],
    })

    ctx.body = { data: lesson };
    return;
  }
}))
