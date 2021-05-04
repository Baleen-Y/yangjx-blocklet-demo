/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
'use strict';

const BaseDb = require('./base.db');

class TransactionsDb extends BaseDb {
    constructor() {
        let indexs = [
            {fieldName: 'hash', unique: true},
            {fieldName: 'tx_index', unique: true},
            {fieldName: 'block_index'},
            {fieldName: 'inputs.prev_out.addr'},
            {fieldName: 'out.addr'}
        ];
        super('transactions', indexs);
    }
}

module.exports = TransactionsDb;