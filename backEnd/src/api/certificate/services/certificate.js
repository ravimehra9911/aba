'use strict';

/**
 * certificate service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::certificate.certificate');
