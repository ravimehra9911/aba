const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', () => ({

    async updatePaymentStatus(ctx) {
        const { session_id, successBool } = ctx.request.body;
        const { id } = ctx.state.user;
        
    try {
          console.log("session_id", session_id)
          console.log("id", id)
            // Search for the order with the provided session ID
      // const order = await strapi.entityService.update('api::order.order', 3, {
      //   data: {
      //     status: 'paid',
      //   },
      // })

      const order = await strapi.db.query('api::order.order').update({
        where: { checkout_session: session_id },
        data: {
          status: successBool?"paid": "unpaid",
        }
      });

      console.log("foundOrder",order)
      
            if (!order) {
              return ctx.throw(404, 'Order not found');
            }
      if (successBool) {
        const { courses } = await strapi.entityService.findOne('api::order.order', order.id, {
          populate: { courses: true },
        })
        const { bundles } = await strapi.entityService.findOne('api::order.order', order.id, {
          populate: { bundles: true },
        })
        console.log("1course", courses);
        console.log("1bundles", bundles);
        const courseIds = courses.map(c => c.id)
        const bundleIds = bundles.map(b => b.id)
        const bundleCourses = await Promise.all(
          bundleIds.map(async (item) => {
              console.log(item)
            const { courses } = await strapi.entityService.findOne('api::bundle.bundle', item, {
              populate: { courses: true },
            })
              return courses
          })
        )
        const bundleCourseIds = bundleCourses.flat().map(course => course.id)
        
        const updatedUser = await strapi.entityService.findOne("plugin::users-permissions.user", id, {
          populate: { courses: true }, // Include the courses relation when retrieving the user
        }); 
        
        const existingCourses = updatedUser.courses.map(c => c.id); // Extract existing course IDs

        const updatedCourses = [...existingCourses, ...courseIds, ...bundleCourseIds]; // Merge existing and new course IDs

        const user = await strapi.entityService.update("plugin::users-permissions.user", id, {
          data: {
            courses: updatedCourses, // Assign the merged course IDs to the courses field
          },
        });
        console.log(user);
        const emailResponse = await strapi.plugins['email'].services.email.send({
          to: user.email,
          from: 'g.singh0605@gmail.com',
          subject: "Your payment is done",
          text:`Your Order is successfully placed. Your order id is ${order.id}`
        })


        return { order, code: 200 };
         } else {
        return {order, code: 200}
      }
    } catch (error) {
      console.log(error);
            console.log(error)
            return ctx.throw(500, 'Internal server error');
          }
  },
  // async findUserOrders(ctx) {
  //   const userId = ctx.state.user.id; // Assuming user ID is available in the state object

  //   try {
  //     // Fetch orders associated with the user
  //     const orders = await strapi.db.query('api::order.order').findMany({ 
  //       where: { user: userId, status:"paid" },
  //      });

  //     // Return the orders
  //     return { orders, code: 200 };
  //   } catch (error) {
  //     console.error(error);
  //     ctx.throw(500, 'An error occurred while fetching orders.');
  //   }
  // },
    })
);
