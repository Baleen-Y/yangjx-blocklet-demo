/**
 * @fileOverview app入口
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

require('./init');
const express = require('express');
const path = require('path');
const log4js = require('log4js');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// process.env.NODE_ENV = blocklet.config.debug ? 'development' : 'production';
let app = express();
// app.set('env', process.env.NODE_ENV);
app.set('jsonp callback name', 'callback');
app.use(log4js.connectLogger(blocklet.logger.access, {level: 'auto'}));
app.use(bodyParser.json({limit: '500mb'}));
app.use(bodyParser.urlencoded({limit: '500mb', extended: false}));
app.use(expressValidator());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'public')));
/** 加载路由 */
const router = require('./router')
app = router.appendRouter(app);

module.exports = app;