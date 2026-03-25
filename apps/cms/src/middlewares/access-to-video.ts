import Strapi from "@strapi/strapi";

const accessToVideo: Strapi.Core.MiddlewareFactory = (config, { strapi }) => {
  return async (context, next) => {
    console.log(context.state.user);

    return next();
  };
};

export default accessToVideo;
