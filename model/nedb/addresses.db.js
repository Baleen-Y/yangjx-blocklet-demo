/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
'use strict';

const BaseDb = require('./base.db');

class AddressesDb extends BaseDb {
    constructor() {
        let indexs = [{fieldName: 'address', unique: true}, {fieldName: 'hash160', unique: true}];
        super('addresses', indexs);
    }
}

module.exports = AddressesDb;