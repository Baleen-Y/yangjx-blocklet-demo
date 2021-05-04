/**
 * @fileOverview 加载配置，初始化
 * @author yangjx 2021/5/1
 * @module init
 */
/** 全局变量blocklet*/
'use strict';
global.blocklet = global.blocklet || {};
blocklet.appName = 'blocklet.backend';
blocklet.pk = require('./package.json');
blocklet.baseDir = __dirname;
blocklet.config = require('./conf/system.config');
blocklet.tools = Object.assign({}, require("./common/tools"));
blocklet.logger = new (require("./common/logger"))(blocklet.config.debug);
blocklet.module = {};
blocklet.module.moment = require('moment');
blocklet.module.moment.locale('zh-cn');


