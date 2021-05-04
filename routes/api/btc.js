/**
 * @fileOverview api/blockchain
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

const express = require('express');
const router = express.Router();
const retSchema = require('../../model/retSchema');
const tools = blocklet.tools;
const bitcoinLogic = require('../../logic/blocklet/bitcoin.logic');

/**
 * @description index description
 */
router.get('/block', async function (req, res, next) {
    try {
        req.check('blockHash', 'blockHash not be null!').notEmpty();
        tools.paramCheck(req, res);
        let ret = await bitcoinLogic.getSingleBlock(req.reqParams.blockHash, req.reqParams.txSize);
        tools.apiResultHandler(ret, res);
    } catch (e) {
        blocklet.logger.error(e);
        tools.apiErrorHandler(e, res);
    }
});

router.get('/tx', async function (req, res, next) {
    try {
        req.check('txHash', 'txHash not be null!').notEmpty();
        tools.paramCheck(req, res);
        let ret = await bitcoinLogic.getSingleTransaction(req.reqParams.txHash, req.reqParams.txSize);
        tools.apiResultHandler(ret, res);
    } catch (e) {
        blocklet.logger.error(e);
        tools.apiErrorHandler(e, res);
    }
});

router.get('/addr', async function (req, res, next) {
    try {
        req.check('address', 'address not be null!').notEmpty();
        tools.paramCheck(req, res);
        let ret = await bitcoinLogic.getSingleAddress(req.reqParams.address);
        tools.apiResultHandler(ret, res);
    } catch (e) {
        blocklet.logger.error(e);
        tools.apiErrorHandler(e, res);
    }
});

router.get('/tx-list', async function (req, res, next) {
    try {
        req.check('hash', 'hash not be null!').notEmpty();
        req.check('type', 'type not be null!').notEmpty();
        tools.paramCheck(req, res);
        let ret = await bitcoinLogic.getTransactionList(req.reqParams.hash, req.reqParams.type, req.reqParams.pageNum, req.reqParams.pageSize);
        tools.apiResultHandler(ret, res);
    } catch (e) {
        blocklet.logger.error(e);
        tools.apiErrorHandler(e, res);
    }
});

router.get('/tx-total-value', async function (req, res, next) {
    try {
        req.check('hash', 'hash not be null!').notEmpty();
        req.check('type', 'type not be null!').notEmpty();
        tools.paramCheck(req, res);
        let ret = await bitcoinLogic.calculateTransactionValue(req.reqParams.hash, req.reqParams.type);
        tools.apiResultHandler(ret, res);
    } catch (e) {
        blocklet.logger.error(e);
        tools.apiErrorHandler(e, res);
    }
});

module.exports = router;