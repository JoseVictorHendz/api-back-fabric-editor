import * as express from "express";
import userRoute from "./User-Route";
import pageRoute from "./Page-Route";
import { AuthController } from "../Controllers/Auth-Controller";
import { MiddlewareAuth } from "../Middlewares/middleware-auth";

class Routes {
    public express: express.Application;
    public router: express.Router;
    public autenticarController: AuthController;
    public middlewareAuth: MiddlewareAuth;
  
    constructor() {
        this.express = express();
        this.router = express.Router();
        this.autenticarController = new AuthController();
        this.middlewareAuth = new MiddlewareAuth();
        this.routes();
    }

    private routes(): void {
        this.router.post("/token", this.autenticarController.token);
        this.router.get("/test", this.autenticarController.test);
        this.router.post("/refresh-token", this.middlewareAuth.checkAuth, this.autenticarController.refreshToken);
        
        this.router.use("/user", userRoute)
        this.router.use("/page", pageRoute)
    }

}

export default new Routes().router;
