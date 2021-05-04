/**
 * @fileOverview
 * @author yangjx 2021/5/3
 * @module
 */
'use strict';

import queryString from 'query-string';

export default {
    fetch: fetch,
    request: async function (url, options) {
        let fetchOption = {};
        fetchOption.method = options.method || 'GET';
        fetchOption.method = fetchOption.method.toUpperCase();
        if (options.redirect) {
            fetchOption.redirect = options.redirect;
        }
        options.data = options.data || {};
        if (fetchOption.method === 'POST') {
            if (options.notJson) {
                fetchOption.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                if (options.data) {
                    fetchOption.body = queryString.stringify(options.data);
                }
            } else {
                fetchOption.headers['Accept'] = 'application/json';
                fetchOption.headers['Content-Type'] = 'application/json';
                if (options.data) {
                    fetchOption.body = JSON.stringify(options.data);
                }
            }
        } else {
            if (options.data) {
                url += (url.includes('?') ? '&' : '?') + queryString.stringify(options.data);
            }
        }

        try {
            let res = await fetch(url, fetchOption);
            if (!res.ok) {
                throw new Error('网络请求出错，请稍后再试');
            }
            /* console.log(url, fetchOption, res); */
            return options.notJson ? res : res.json();
        } catch (err) {
            let msg = err.message || JSON.stringify(err);
            if (err.name === 'TypeError' && err.message === 'Network request failed') {
                msg = '网络请求出错，请稍后再试';
            }
            return {code: -1, msg: msg};
        }
    },
    get: async function (url, data) {
        return this.request(url, {method: 'GET', data});
    },
    post: async function (url, data) {
        return this.request(url, {method: 'POST', data});
    }
};