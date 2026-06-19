"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    register({ strapi }) { },
    bootstrap({ strapi }) { },
    contentTypes: {
        course: {
            schema: require('./server/content-types/course/schema.json'),
        },
    },
    controllers: {},
    routes: {},
};
