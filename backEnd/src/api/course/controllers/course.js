'use strict';

/**
 * course controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
    async find(ctx) {
        // Fetch the courses using the default find controller
        let entities;
        if (ctx.query._q) {
          entities = await strapi.service("api::course.course").search(ctx.query);
        } else {
          entities = await strapi.service("api::course.course").find(ctx.query);
        }
    
        // Conditionally remove the courseUrl field if not requested from userDashboard page
        if (!ctx.query._page || ctx.query._page !== 'userDashboard') {
            console.log(entities)
          entities = entities.results.map(entity => {
            const { courseUrl, ...rest } = entity;
            return rest;
          });
        }
    
        // Return the modified response
        return entities;
      },
}
));
