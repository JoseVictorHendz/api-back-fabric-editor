import * as express from "express";
import testRoute from "./test-route";

class Routes {
    public express: express.Application;
    public router: express.Router;
    // public autenticarController: AutenticarController;
    // public middlewareAuth: MiddlewareAuth;
  
    constructor() {
        this.express = express();
        this.router = express.Router();
        // this.autenticarController = new AutenticarController();
        // this.middlewareAuth = new MiddlewareAuth();
        this.routes();
    }

    private routes(): void {
        this.router.use("/test", testRoute)
    }

}

export default new Routes().router;
