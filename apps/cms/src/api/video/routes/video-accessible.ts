import Strapi from "@strapi/strapi";

const router: Strapi.Core.Router = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/videos/accessible",
      handler: "video.findAccessible",
      info: {},
      config: {
      },
    },
  ],
};

export default router;
