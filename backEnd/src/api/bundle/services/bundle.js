'use strict';

/**
 * bundle service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::bundle.bundle');
