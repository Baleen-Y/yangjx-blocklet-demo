/**
 * @fileOverview
 * @author yangjx 2021/5/3
 * @module
 */

'use strict';

import Request from "./Request";

export default {
    getSingleBlock: async function (blockHash, txSize = 5) {
        let res = await Request.get('/api/btc/block', {blockHash, txSize});
        if (res.code === 0) {
            return res.data;
        }
        return null;
    },
    getSingleAddress: async function (address, txSize = 5) {
        let res = await Request.get('/api/btc/addr', {address, txSize});
        if (res.code === 0) {
            return res.data;
        }
        return null;
    },
    getSingleTransaction: async function (txHash) {
        let res = await Request.get('/api/btc/tx', {txHash});
        if (res.code === 0) {
            return res.data;
        }
        return null;
    },
    getTransactionList: async function (hash, type, pageNum, pageSize = 5) {
        let res = await Request.get('/api/btc/tx-list', {hash, type, pageNum, pageSize});
        if (res.code === 0) {
            return res.data;
        }
        return null;
    },
    getTransactionAmount: async function (hash, type) {
        let res = await Request.get('/api/btc/tx-total-value', {hash, type});
        if (res.code === 0) {
            return res.data;
        }
        return null;
    }
};