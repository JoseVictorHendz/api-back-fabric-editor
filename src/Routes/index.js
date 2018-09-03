'use strict';

const express = require('express');
const router  = express.Router();

router.use('/', require('./test-route'));

module.exports = router;
