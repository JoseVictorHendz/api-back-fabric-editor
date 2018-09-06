"use strict";
// import express = require("express");
// import Routes from './Routes'
Object.defineProperty(exports, "__esModule", { value: true });
// // Our Express APP config
// const app = express();
// app.set("port", process.env.PORT || 3000);
// // API Endpoints
// this.express.use(Routes);
// // export our app
// export default app;
const bodyParser = require("body-parser");
// import * as cors from "cors";
const express = require("express");
// import * as helmet from "helmet";
const http = require("http");
// import * as methodOverride from "method-override";
// import { IError } from "./interfaces/error";
const routes_1 = require("./routes");
// import { sequelize } from "./sequelize";
// tslint:disable-next-line:no-var-requires
// const newrelic = require("newrelic");
class App {
    constructor() {
        this.express = express();
        this.middlewares();
        // this.initSequelize();
        this.server = http.createServer(this.express);
    }
    middlewares() {
        // body parser config
        this.express.use(bodyParser.json({ limit: "50mb" }));
        this.express.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
        // method override config
        // this.express.use(methodOverride("X-HTTP-Method"));
        // this.express.use(methodOverride("X-HTTP-Method-Override"));
        // this.express.use(methodOverride("X-Method-Override"));
        // this.express.use(methodOverride("_method"));
        // cors config
        // this.express.use(
        //   cors({
        //   allowedHeaders: ["Content-type", "x-access-token", "Origin", "X-Requested-With", "Content-Type", "Accept"],
        //   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        //   origin: ["*",
        //   "http://localhost:4200"
        //   ],
        //   }),
        // );
        this.express.use(express.static("public"));
        // helmet config
        // this.express.use(helmet.noCache());
        // this.express.use(helmet.hidePoweredBy());
        // routes config
        this.express.use(routes_1.default);
        // not found handler
        // this.express.use(this.notFoundHandler);
        // all error hanlder
        // this.express.use(this.errorHandler);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map