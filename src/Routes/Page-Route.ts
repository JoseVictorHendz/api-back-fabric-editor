import * as express from "express";
import { PageController } from "../Controllers/Page-Controller"
import { MiddlewareAuth } from "../Middlewares/middleware-auth";

class PageRoute {
    public express: express.Application;
    public router: express.Router;
    public pageController: PageController;
      public middlewareAuth: MiddlewareAuth;

    constructor() {
        this.express = express();
        this.router = express.Router();
        this.pageController = new PageController();
        this.middlewareAuth = new MiddlewareAuth();
        this.middlewares();
        this.initRoutes();
    }

    private middlewares(): void {
        // this.router.use(this.middlewareAuth.checkAuth);
        // this.router.use(this.middlewareAuth.checkAcl);
    }

    private initRoutes(): void {
        this.router.get("/", this.pageController.getAll);
        this.router.get("/:_id", this.pageController.getOne);
        this.router.post("/", this.pageController.create);
        this.router.put("/:_id", this.pageController.update);
        this.router.put("/active/:_id", this.pageController.updateActive);
        this.router.delete("/:_id", this.pageController.delete);
    }
}

export default new PageRoute().router;
