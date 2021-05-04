/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
'use strict';

const BaseDb = require('./base.db');

class BlocksDb extends BaseDb {
    constructor() {
        let indexs = [{fieldName: 'hash', unique: true}, {fieldName: 'block_index', unique: true}];
        super('blocks', indexs);
    }
}

module.exports = BlocksDb;