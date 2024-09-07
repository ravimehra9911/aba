module.exports = (plugin) => {
  plugin.controllers.user.findMyOrders = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: ctx.state.user.id },
      populate: {
        orders: {
          where: {
            status: {
              $eq: "paid",
            },
          },
        },
      },
    });
    if (user) {
      ctx.response.status = 200;
      return { user };
    } else {
      ctx.response.status = 404;
    }
  };

  plugin.controllers.user.findMyCourses = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const user = await strapi.query("plugin::users-permissions.user").findOne({
      where: { id: ctx.state.user.id },
      populate: {
        courses: {
          select: ["id", "title", "courseUrl", "description", "instructor"], // Include the required fields
        },
        ratings: {
          select: ["courseRating", "userId", "courseId"],
        },
      },
    });

    if (user) {
      const courses = user.courses.map((course) => {
        const rating = user.ratings.find(
          (rating) => rating.courseId === course.id
        );
        return {
          ...course,
          rating: rating ? rating.courseRating : null,
        };
      });
      user.courses = courses;
      ctx.response.status = 200;
      return { user };
    } else {
      ctx.response.status = 404;
    }
  };

  plugin.controllers.user.updatePhoneNumber = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const newPhoneNumber = await ctx.request.body.phoneNumber;
    console.log("newPhoneNumber", newPhoneNumber);
    const user = await strapi.query("plugin::users-permissions.user").update({
      where: { id: ctx.state.user.id },
      data: {
        phoneNumber: newPhoneNumber,
      },
    });
    if (user) {
      ctx.response.status = 200;
      return {
        status: "success",
      };
    } else {
      ctx.response.status = 404;
      return {
        status: "failed",
      };
    }
  };

  plugin.controllers.user.updateAddress = async (ctx) => {
    if (!ctx.state.user || !ctx.state.user.id) {
      return (ctx.response.status = 401);
    }
    const newAddress = await ctx.request.body.newAddress;
    const newCity = await ctx.request.body.newCity;
    const newCountry = await ctx.request.body.newCountry;
    const newZipcode = await ctx.request.body.newZipcode;
    if (!newCity || !newAddress || !newCountry || !newZipcode) {
      ctx.response.status = 422;
      return {
        status: "invalid fields",
      };
    }
    const user = await strapi.query("plugin::users-permissions.user").update({
      where: { id: ctx.state.user.id },
      data: {
        address: newAddress,
        city: newCity,
        country: newCountry,
        zipcode: newZipcode,
      },
    });
    if (user) {
      ctx.response.status = 200;
      return {
        status: "success",
      };
    } else {
      ctx.response.status = 404;
      return {
        status: "failed",
      };
    }
  };

  plugin.routes["content-api"].routes.push({
    method: "GET",
    path: "/user/me/findMyOrders",
    handler: "user.findMyOrders",
    config: {
      prefix: "",
      policies: [],
    },
  });
  plugin.routes["content-api"].routes.push({
    method: "GET",
    path: "/user/me/findMyCourses",
    handler: "user.findMyCourses",
    config: {
      prefix: "",
      policies: [],
    },
  });
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/me/updatePhoneNumber",
    handler: "user.updatePhoneNumber",
    config: {
      prefix: "",
      policies: [],
    },
  });
  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/me/updateAddress",
    handler: "user.updateAddress",
    config: {
      prefix: "",
      policies: [],
    },
  });
  return plugin;
};
