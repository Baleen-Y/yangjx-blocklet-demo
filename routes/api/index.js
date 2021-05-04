/**
 * @fileOverview api/index
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

const express = require('express');
const router = express.Router();

/**
 * @description index description
 */
router.get('/', async function (req, res, next) {
    return res.json('welcome blocklet api');
});

module.exports = router;
