/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
'use strict';

const BlocksDb = require('./blocks.db');
const AddressesDb = require('./addresses.db');
const TransactionsDb = require('./transactions.db');

module.exports.BlocksDb = BlocksDb;
module.exports.AddressesDb = AddressesDb;
module.exports.TransactionsDb = TransactionsDb;