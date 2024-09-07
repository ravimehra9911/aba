'use strict';

/**
 * bundle router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::bundle.bundle');
