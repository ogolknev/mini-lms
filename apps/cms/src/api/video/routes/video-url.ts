import Strapi from "@strapi/strapi";

const router: Strapi.Core.Router = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/videos/:id/url",
      handler: "video.findOneUrl",
      info: {},
      config: {
        policies: ["is-accessible"],
      },
    },
  ],
};

export default router;
