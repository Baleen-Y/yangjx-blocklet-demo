/**
 * @fileOverview index
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';
const express = require('express');
const router = express.Router();
const path = require('path');
/**
 * @description index description
 */
router.get('/', async function (req, res, next) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
    // return res.json('welcome blocklet');
});

module.exports = router;