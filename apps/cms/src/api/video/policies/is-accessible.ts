import Strapi from "@strapi/strapi";

export default async (
  ctx: Strapi.Core.PolicyContext & { [key: string]: any },
  config: any,
  { strapi }: { strapi: Strapi.Core.Strapi },
) => {
  const user = await strapi
    .documents("plugin::users-permissions.user")
    .findOne({
      documentId: ctx.state.user.documentId,
      populate: { student: { populate: { courses: { populate: "videos" } } } },
    });
  const videoId: string = ctx.params.id;

  return checkAccessToVideo(user, videoId, strapi);
};

async function checkAccessToVideo(
  user: User,
  videoDocumentId: string,
  strapi: Strapi.Core.Strapi,
) {
  const accessibleVideoIds = getVideoIdsAccessibleByUser(user, strapi);

  return (await accessibleVideoIds).includes(videoDocumentId);
}

async function getVideoIdsAccessibleByUser(
  user: User,
  strapi: Strapi.Core.Strapi,
) {
  const courses = user.student.courses;
  const videos = courses.map((c) => c.videos).flat();
  const videoIds = videos.map((v) => v.documentId);
  return videoIds;
}

type User = Strapi.Data.ContentType<"plugin::users-permissions.user">;
