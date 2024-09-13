"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_dev_1 = require("./config.dev");
const env = process.env.NODE_ENV || 'development';
const configurations = {
    development: config_dev_1.default,
};
const config = configurations[env];
exports.default = config;
//# sourceMappingURL=index.js.map