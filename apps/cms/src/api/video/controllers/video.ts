/**
 * video controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::video.video",
  ({ strapi }) => ({
    async findOneUrl(ctx) {
      const { populate } = ctx.query;

      const video = await strapi
        .documents("api::video.video")
        .findOne({ documentId: ctx.params.id, populate });

      return video;
    },
    async findAccessible(ctx) {
      const { populate } = ctx.query;
      const user = await strapi
        .documents("plugin::users-permissions.user")
        .findOne({
          documentId: ctx.state.user.documentId,
          populate: {
            student: {
              populate: {
                courses: { populate: { videos: { populate } } },
              },
            },
          },
        });

      const videos = user.student.courses.map((c) => c.videos).flat();

      return { videos };
    },
  })
);
