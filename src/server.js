'use strict';

const express = require('express')
const server = express()

server.use("/", require("./Routes"))

server.listen(process.env.PORT || 3000, () => {
    console.log("Server listening in port 3000\nCtrl + c quit")
})

module.exports = server;