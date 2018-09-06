"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const test_controller_1 = require("../Controllers/test-controller");
// import { MiddlewareAuth } from "./../../middlewares/middleware-auth";
class TestRout {
    //   public middlewareAuth: MiddlewareAuth;
    constructor() {
        this.express = express();
        this.router = express.Router();
        this.testController = new test_controller_1.TestController();
        // this.middlewareAuth = new MiddlewareAuth();
        this.middlewares();
        this.initRoutes();
    }
    middlewares() {
        // this.router.use(this.middlewareAuth.checkAuth);
        // this.router.use(this.middlewareAuth.checkAcl);
    }
    initRoutes() {
        this.router.get("/", this.testController.getAll);
    }
}
exports.default = new TestRout().router;
//# sourceMappingURL=test-route.js.map