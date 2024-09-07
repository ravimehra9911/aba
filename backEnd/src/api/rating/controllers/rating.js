"use strict";

/**
 * rating controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::rating.rating", ({ strapi }) => ({
  async create(ctx) {
    console.log("create rating");
    const { course, courseRating } = ctx.request.body;

    const { id } = ctx.state.user;
    console.log(course, courseRating);
    const foundCourse = await strapi.db.query("api::course.course").findOne({
      select: ["id", "totalRating"],
      where: {
        id: course,
      },
      populate: {
        users: {
          select: ["id", "username"],
        },
        ratings: true,
      },
    });
    if (!foundCourse) {
      return ctx.throw(404, "Course not found");
    }
    console.log(foundCourse);
    if (!foundCourse.users.find((user) => user.id === id)) {
      return ctx.throw(403, "You are not enrolled in this course");
    }
    try {
      const existingRating = await strapi.db
        .query("api::rating.rating")
        .findOne({
          where: {
            course: course,
            users_permissions_user: id,
          },
        });
      if (existingRating) {
        const updatedRating = await strapi.entityService.update(
          "api::rating.rating",
          existingRating.id,
          {
            data: { courseRating: courseRating },
          }
        );
        const updatedCourse = await strapi.entityService.update(
          "api::course.course",
          course,
          {
            data: {
              totalRating:
                (foundCourse.totalRating * foundCourse.ratings.length -
                  existingRating.courseRating +
                  courseRating) /
                foundCourse.ratings.length,
            },
          }
        );
        return { rating: updatedRating };
      }
      const rating = await strapi.service("api::rating.rating").create({
        data: {
          courseId: course,
          userId: id,
          course: course,
          courseRating: courseRating,
          users_permissions_user: id,
        },
      });
      const updatedCourse = await strapi.entityService.update(
        "api::course.course",
        course,
        {
          data: {
            totalRating:
              (foundCourse.totalRating * foundCourse.ratings.length +
                courseRating) /
              (foundCourse.ratings.length + 1),
          },
        }
      );

      return { rating };
    } catch (error) {
      ctx.response.status = 500;
      console.log(error);
      return error;
    }
  },
}));
