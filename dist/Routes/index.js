"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const test_route_1 = require("./test-route");
class Routes {
    // public autenticarController: AutenticarController;
    // public middlewareAuth: MiddlewareAuth;
    constructor() {
        this.express = express();
        this.router = express.Router();
        // this.autenticarController = new AutenticarController();
        // this.middlewareAuth = new MiddlewareAuth();
        this.routes();
    }
    routes() {
        this.router.use("/test", test_route_1.default);
    }
}
exports.default = new Routes().router;
//# sourceMappingURL=index.js.map