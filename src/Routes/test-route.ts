import * as express from "express";
import { TestController } from "../Controllers/test-controller"
// import { MiddlewareAuth } from "./../../middlewares/middleware-auth";

class TestRout {
    public express: express.Application;
    public router: express.Router;
    public testController: TestController;
    //   public middlewareAuth: MiddlewareAuth;

    constructor() {
        this.express = express();
        this.router = express.Router();
        this.testController = new TestController();
        // this.middlewareAuth = new MiddlewareAuth();
        this.middlewares();
        this.initRoutes();
    }

    private middlewares(): void {
        // this.router.use(this.middlewareAuth.checkAuth);
        // this.router.use(this.middlewareAuth.checkAcl);
    }

    private initRoutes(): void {
        this.router.get("/", this.testController.getAll);
    }
}

export default new TestRout().router;
