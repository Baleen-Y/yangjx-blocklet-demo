/**
 * @fileOverview
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

const config = blocklet.config;
const bitcoinConfig = config.blockchainConfig.bitcoin;
const tools = blocklet.tools;
const logger = blocklet.logger;
const request = require('../../common/request');
const moment = require('moment');

module.exports.getSingleBlock = async function getSingleBlock(blockHash) {
    if (!blockHash) {
        throw new Error('blockHash cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.singleBlock + '/' + blockHash;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request singleBlock error');
    }
    return ret;
};

module.exports.getSingleTransaction = async function (txHash) {
    if (!txHash) {
        throw new Error('txHash cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.singleTransaction + '/' + txHash;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request singleTransaction error');
    }
    return ret;
};

module.exports.getBlockOfHeight = async function (blockHeight) {
    if (!blockHeight) {
        throw new Error('blockHeight cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.blockOfHeight + '/' + blockHeight;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request blockOfHeight error');
    }
    return ret;
};

module.exports.getSingleAddress = async function (bitcoinAddress) {
    if (!bitcoinAddress) {
        throw new Error('bitcoinAddress cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.singleAddress + '/' + bitcoinAddress;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request singleAddress error');
    }
    return ret;
};

module.exports.getMultiAddress = async function (bitcoinAddresses) {
    if (!bitcoinAddresses || bitcoinAddresses.length <= 0) {
        throw new Error('bitcoinAddresses cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.multiAddress;
    let params = {
        active: bitcoinAddresses
    }
    let ret = await request.getJson(url, params, {arrayFormat: 'separator', arrayFormatSeparator: '|'});
    if (ret.error) {
        throw new Error(ret.message || 'request multiAddress error');
    }
    return ret;
};

module.exports.getUnspent = async function (bitcoinAddresses) {
    if (!bitcoinAddresses || bitcoinAddresses.length <= 0) {
        throw new Error('bitcoinAddresses cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.unspentOutputs;
    let params = {
        active: bitcoinAddresses
    }
    let ret = await request.getJson(url, params, {arrayFormat: 'separator', arrayFormatSeparator: '|'});
    if (ret.error) {
        throw new Error(ret.message || 'request unspent error');
    }
    return ret;
};

module.exports.getBalance = async function (bitcoinAddresses) {
    if (!bitcoinAddresses || bitcoinAddresses.length <= 0) {
        throw new Error('bitcoinAddresses cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.balance;
    let params = {
        active: bitcoinAddresses
    }
    let ret = await request.getJson(url, params, {arrayFormat: 'separator', arrayFormatSeparator: '|'});
    if (ret.error) {
        throw new Error(ret.message || 'request balance error');
    }
    return ret;
};

module.exports.getLatestBlock = async function () {
    let url = bitcoinConfig.baseUrl + bitcoinConfig.latestBlock;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request latestBlock error');
    }
    return ret;
};

module.exports.getUnconfirmedTransactions = async function () {
    let url = bitcoinConfig.baseUrl + bitcoinConfig.unconfirmedTransactions;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request unconfirmedTransactions error');
    }
    return ret;
};

module.exports.getBlocksOfTime = async function (timeInMilliseconds) {
    if (!timeInMilliseconds) {
        throw new Error('timeInMilliseconds cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.blocks + '/' + timeInMilliseconds;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request blocksOfTime error');
    }
    return ret;
};

module.exports.getBlocksOfPool = async function (poolName) {
    if (!poolName) {
        throw new Error('poolName cannot be null!');
    }
    let url = bitcoinConfig.baseUrl + bitcoinConfig.blocks + '/' + poolName;
    let ret = await request.getJson(url);
    if (ret.error) {
        throw new Error(ret.message || 'request blocksOfPool error');
    }
    return ret;
};




