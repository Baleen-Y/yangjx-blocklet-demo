/**
 * @fileOverview 定时更新
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

require('../init');
const CronJob = require('cron').CronJob;
const bitcoinLogic = require('../logic/blocklet/bitcoin.logic');

const _fnError = async function(err) {
    blocklet.logger.error(err);
};
process.on('uncaughtException', _fnError);
process.on('unhandledRejection', _fnError);

new CronJob(blocklet.config.cronConfig.latestBlockPattern, async function () {
    try {
        await bitcoinLogic.pullLatestBlockData();
    } catch (err) {
        blocklet.logger.error(err);
    }
}, null, true);

blocklet.logger.info('cron-update start');
