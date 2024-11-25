"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.JWT_KEY = exports.TRANSPORT = exports.NATS_SERVER = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
exports.NATS_SERVER = process.env.NATS_SERVER;
exports.TRANSPORT = process.env.TRANSPORT;
exports.JWT_KEY = process.env.JWT_KEY;
exports.DATABASE_URL = process.env.DATABASE_URL;
//# sourceMappingURL=index.js.map