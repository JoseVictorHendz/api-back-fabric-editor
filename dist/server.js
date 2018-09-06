"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
// import * as moment from "moment";
// import * as socketIo from "socket.io";
const app_1 = require("./app");
// const socketJwt = require("socketio-jwt-auth");
// const secretJwtKey = process.env.JWT_SECRET || "secretApiKey";
// const cron = require("node-cron");
const port = normalizePort(process.env.PORT || 3000);
const server = http.createServer(app_1.default);
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
function normalizePort(val) {
    const port = typeof val == "string" ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
function onError(error) {
    if (error.syscall !== "listen")
        throw error;
    const bind = typeof port == "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
function onListening() {
    const addr = server.address();
    const bind = typeof addr == "string" ? `pipe ${addr}` : `port ${addr.port}`;
    console.info(`Listening on ${bind}`);
}
//# sourceMappingURL=server.js.map