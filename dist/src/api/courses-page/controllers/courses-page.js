"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::courses-page.courses-page', ({ strapi }) => ({
    async find(ctx) {
        const entity = await strapi.entityService.findOne('api::courses-page.courses-page', 1, {
            populate: {
                heroimage: true,
                larningpath: {
                    populate: {
                        routepath: true,
                    },
                },
            },
        });
        return { data: entity };
    },
}));
