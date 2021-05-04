/**
 * @fileOverview
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';
const uuid = require('uuid');
const _ = require('lodash');

let tools = {
    /**
     * @description api数据接口结果封装
     * @param {Object} data 返回的数据
     * @param {Number} code 错误码，默认0
     * @param {String} msg 返回信息，常用作错误提示
     * @return {Object} 封装后的对象
     */
    apiResult: apiResult,
    /**
     * @description api错误信息封装
     * @param {Object} msgOrObj 错误信息
     * @param {Number} code 错误码，默认-1
     * @param {Object} data 数据，默认为空
     * @return {Object} 封装后的对象
     */
    apiErr: apiErr,
    /**
     * @description api错误处理，用在then链中的Response
     * @param {Object} err 错误信息
     * @param {Object} res http response
     * @param {Boolean} [jsonpRet=false] 是否返回jsonp的数据格式
     * @return {Response} 返回json格式的response
     */
    apiErrorHandler: apiErrorHandler,
    /**
     * @description api结果返回处理，用在then链中的Response
     * @param {Object} data 待响应返回的数据对象
     * @param {Object} res http response
     * @param {Boolean} [jsonpRet=false] 是否返回jsonp的数据格式
     * @return {Response} 返回json格式的response
     */
    apiResultHandler: apiResultHandler,
    /**
     * @description 请求参数校验，使用了ExpressValidator
     * @param {Object} req http request
     * @param {Object} res http response
     * @throws {String} 校验不通过抛出错误
     * @return {void} null
     */
    paramCheck: paramCheck,
    /**
     * @description 生成uuid
     * @return {String} uuid
     */
    getUUID: getUUID,
    /**
     * @description 获取request中cookie中的值
     * @param {Object} req request对象
     * @param {String} cookie名
     * @returns {String} 返回对应的cookie值，不存在返回null
     */
    getCookieValue: getCookieValue,
    /**
     * @description 获取请求的客户端IP地址
     * @author menglb
     * @param {Request} req 客户端请求对象
     * @returns {String} 客户端IP
     */
    getClientIp:getClientIp
};

function apiErrorHandler(err, res, jsonpRet = false) {
    if (!err || typeof err.code === 'undefined') {
        err = apiErr(err);
    }
    jsonpRet ? res.jsonp(err) : res.json(err);
}

function apiResultHandler(data, res, jsonpRet = false) {
    if (!data || typeof data.code === 'undefined') {
        data = apiResult(data);
    }
    jsonpRet ? res.jsonp(data) : res.json(data);
}

function paramCheck(req, res) {
    let errors = req.validationErrors();
    if (errors && errors.length > 0) {
        let ermsg = [];
        for (let i = 0; i < errors.length; i++) {
            ermsg.push(errors[i].msg);
        }
        throw new Error(ermsg.join('\n'));
    }
}

function apiErr(msgOrObj, code, data) {
    let err = {};
    if (msgOrObj) {
        err.msg = msgOrObj.toString();
        if (msgOrObj instanceof Error) {
            err.msg = msgOrObj.message;
        }
    } else {
        err.msg = '';
    }
    err.code = code || -1;
    err.data = data || '';
    return err;
}

function apiResult(data, code, msg) {
    return {
        code: code || 0,
        msg: msg,
        data: data
    };
}

function getClientIp(req) {
    let ipStr='127.0.0.1';
    if (req.headers && req.headers['x-forwarded-for']) {
        ipStr= req.headers['x-forwarded-for'];
    }
    else if (req.connection && req.connection.remoteAddress) {
        ipStr= req.connection.remoteAddress;
    }
    else if (req.socket && req.socket.remoteAddress) {
        ipStr= req.socket.remoteAddress;
    }
    else if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
        ipStr= req.connection.socket.remoteAddress;
    }
    ipStr=ipStr.split(':')[ipStr.split(':').length-1];
    return ipStr;
}

function getUUID() {
    return uuid.v1().replace(/-/g, '');
}

function getCookieValue(req, name) {
    if (!req || !req.headers || !req.headers.cookie) {
        return null;
    }

    let cookieString = req.headers.cookie;
    let pairs = cookieString.split(/[;,] */);
    let cookies = {};
    for (let i = 0; i < pairs.length; i++) {
        let idx = pairs[i].indexOf('=');
        let key = pairs[i].substr(0, idx).toLocaleLowerCase();
        let val = pairs[i].substr(++idx, pairs[i].length).trim();
        cookies[key] = val;
    }
    name = name.toLocaleLowerCase();
    if (cookies[name]) {
        return cookies[name];
    } else {
        return null;
    }
}

module.exports = Object.assign({}, _, tools);