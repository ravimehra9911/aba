const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

('use strict');

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::order.order', ({ strapi }) => ({
  async create(ctx) {
    const { courses, bundles, formData, discountedPrice } = ctx.request.body;
    let orderAmount = 0;
    let orderName = '';
    let lineItemsCourses = [];
    let lineItemsBundles = [];
    if (courses) {
      lineItemsCourses = await Promise.all(
        courses.map(async (item) => {
          console.log(item);
          const course = await strapi
            .service('api::course.course')
            .findOne(item);
          orderAmount = orderAmount + course.price * 100;
          orderName = orderName + course.title + ',';
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: course.title,
              },
              unit_amount: course.price * 100,
            },
            quantity: 1,
          };
        })
      );
    }
    if (bundles) {
      lineItemsBundles = await Promise.all(
        bundles.map(async (item) => {
          console.log(item);
          const bundle = await strapi
            .service('api::bundle.bundle')
            .findOne(item);
          orderAmount = orderAmount + bundle.price * 100;
          orderName = orderName + bundle.bundleName + ',';
          return {
            price_data: {
              currency: 'usd',
              product_data: {
                name: bundle.bundleName,
              },
              unit_amount: bundle.price * 100,
            },
            quantity: 1,
          };
        })
      );
    }
    const lineItems = lineItemsCourses.concat(lineItemsBundles);
    console.log('lineitems', lineItems);
    // return
    try {
      console.log('CLIENT URL', process.env.CLIENT_URL);
      const { email, id } = ctx.state.user;
      console.log('email of user', email);
      console.log('id of user', id);
      console.log('course', courses);
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/paymentResult?success=true&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/paymentResult?cancel=true&session_id={CHECKOUT_SESSION_ID}`,
        line_items: lineItems,
        payment_method_types: ['card'],
        metadata: {
          user: email,
          courses: JSON.stringify(courses),
          bundles: JSON.stringify(bundles),
        },
      });

      const order = await strapi.service('api::order.order').create({
        data: {
          status: 'pending',
          checkout_session: session.id,
          orderName: orderName.trim(),
          courses: courses,
          bundles: bundles,
          users_permissions_user: id,
          total: orderAmount,
          ...formData,
        },
      });

      return { order: order, stripeSession: session };
    } catch (error) {
      ctx.response.status = 500;
      console.log(error);
      return error;
    }
  },

  // async updatePaymentStatus(ctx) {
  //     const { session_id } = ctx.request.body;
  //     const { id } = ctx.state.user;
  //     try {
  //         // Search for the order with the provided session ID
  //         const order = await strapi.query('order').findOne({checkout_session: session_id, users_permissions_user: id });

  //         if (!order) {
  //           return ctx.throw(404, 'Order not found');
  //         }

  //         // Update the payment status of the order to 'paid'
  //         const updatedOrder = await strapi.query('order').update({ id: order.id }, { status: 'paid' });

  //         return updatedOrder;
  //       } catch (error) {
  //         return ctx.throw(500, 'Internal server error');
  //       }
  // }
}));
