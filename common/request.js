/**
 * @fileOverview
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

const fetch = require('node-fetch');
const queryString = require('query-string');

class Request {
    async getJson(url, params = {}, queryStringOption = {}, headers = {}) {
        url += (url.includes('?') ? '&' : '?') + queryString.stringify(params, queryStringOption);
        let response = await fetch(url, {method: 'get', headers: headers});
        return await response.json();
    }

    async postJson(url, body = {}, headers = {}) {
        headers = headers || {};
        headers['Content-Type'] = 'application/json';
        let response = await fetch(url, {method: 'post', body: body ? JSON.stringify(body) : {}, headers: headers});
        return await response.json();
    }
}

module.exports = new Request();