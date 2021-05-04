/**
 * @fileOverview 初始化参数、配置等中间件操作
 * @author menglb 2020/6/13
 * @module middleware/init
 */
'use strict';

module.exports.initParams = function (req, res, next) {
    req.reqHost = '//' + req.get('host') + '/';
    req.baseUrl = '/';
    res.locals.baseUrl = req.baseUrl;
    req.reqParams = Object.assign({}, req.query, req.body, req.params);
    next();
};
