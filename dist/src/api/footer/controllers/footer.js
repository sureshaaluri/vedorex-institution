"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapi_1 = require("@strapi/strapi");
exports.default = strapi_1.factories.createCoreController('api::footer.footer', ({ strapi }) => ({
    async find(ctx) {
        try {
            const data = await strapi.documents('api::footer.footer').findFirst({
                status: 'published',
                populate: {
                    logo: true,
                    link_group: {
                        populate: {
                            link_groups: true,
                        },
                    },
                    ContactInfo: true,
                },
            });
            ctx.body = { data };
        }
        catch (err) {
            console.error('ERROR:', err);
            ctx.body = { error: err.message };
        }
    },
}));
