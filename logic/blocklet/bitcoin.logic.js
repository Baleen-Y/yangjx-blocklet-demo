/**
 * @fileOverview
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';

const {BlocksDb, AddressesDb, TransactionsDb} = require('../../model/nedb');
const bitcoinApi = require('../blockchain/bitcoin.api');

module.exports.getSingleBlock = async function (blockHash, txSize = 5) {
    let db = new BlocksDb();
    txSize = Number(txSize);
    let block = await db.findOne({$or: [{hash: blockHash}, {block_index: Number(blockHash)}]});
    if (!block) {
        block = await bitcoinApi.getSingleBlock(blockHash);
        await saveBlockToDb(Object.assign({}, block));
        block.tx = block.tx.length > 0 ? block.tx.slice(0, txSize) : block.tx;
        return block;
    }
    let txDb = new TransactionsDb();
    block.tx = await txDb.find({block_index: block.block_index}).sort({time: -1}).limit(txSize);
    return block;

};

module.exports.getSingleTransaction = async function (txHash) {
    let db = new TransactionsDb();
    let transaction = await db.findOne({$or: [{hash: txHash}, {tx_index: Number(txHash)}]});
    if (transaction) {
        return transaction;
    }
    transaction = await bitcoinApi.getSingleTransaction(txHash);
    db.upsertOne({hash: transaction.hash}, transaction);
    return transaction;
};

module.exports.getTransactionList = async function (hash, type, pageNum = 1, pageSize = 5) {
    let db = new TransactionsDb();
    let txs = [];
    pageNum = Number(pageNum);
    pageSize = Number(pageSize);
    if ('block' === type) {
        txs = await db.find({block_index: Number(hash)}).sort({time: -1}).limit(pageSize).skip((pageNum - 1) * pageSize);
    }
    if ('address' === type) {
        txs = await db.find({$or: [{'inputs.prev_out.addr': hash}, {'out.addr': hash}]}).sort({time: -1}).limit(pageSize).skip((pageNum - 1) * pageSize);
    }
    return txs;
};

module.exports.getSingleAddress = async function (address, txSize = 5) {
    let db = new AddressesDb();
    txSize = Number(txSize);
    let addressInfo = await db.findOne({$or: [{address: address}, {hash160: address}]});
    if (!addressInfo) {
        addressInfo = await bitcoinApi.getSingleAddress(address);
        await saveAddressToDb(Object.assign({}, addressInfo));
        addressInfo.txs = addressInfo.txs.length > 0 ? addressInfo.txs.slice(0, txSize) : addressInfo.txs;
        return addressInfo;
    }
    let txDb = new TransactionsDb();
    addressInfo.txs = await txDb.find({$or: [{'inputs.prev_out.addr': addressInfo.address}, {'out.addr': addressInfo.address}]}).sort({time: -1}).limit(txSize);
    // addressInfo.txs = await txDb.find({address: addressInfo.address}).sort({ time: -1 });
    return addressInfo;
};

module.exports.pullLatestBlockData = async function () {
    let block = await bitcoinApi.getLatestBlock();
    // let db = new BlocksDb();
    // block = await db.findOne({hash: block.hash});
    // if (block) {
    //     return;
    // }
    block = await bitcoinApi.getSingleBlock(block.hash);
    await saveBlockToDb(block);
}

module.exports.initAllBlockData = async function () {

}

async function saveBlockToDb(block) {
    let txs = block.tx;
    delete block.tx;
    let db = new BlocksDb();
    await db.upsertOne({hash: block.hash}, block);
    await saveManyTransactionToDb(txs);
}

async function saveAddressToDb(addressInfo) {
    let txs = addressInfo.txs;
    delete addressInfo.txs;
    let db = new AddressesDb();
    await db.upsertOne({address: addressInfo.address}, addressInfo);
    await saveManyTransactionToDb(txs);
}

async function saveManyTransactionToDb(txs) {
    if (txs.length <= 0) return;
    let txHashs = txs.map(x => x.hash);
    let txDb = new TransactionsDb();
    let existed = await txDb.find({hash: {$in: txHashs}}, {hash: 1, _id: 0});
    existed = existed.map(x => x.hash);
    let unexistTxs = txs.filter(x => existed.indexOf(x.hash) === -1);
    await txDb.insertMany(unexistTxs);
}

module.exports.calculateTransactionValue = async function (hash, type) {
    let db = new TransactionsDb();
    let txs = [];
    if ('block' === type) {
        txs = await db.find({block_index: Number(hash)}, {'out.value': 1, _id: 0, fee: 1});
    }
    if ('address' === type) {
        txs = await db.find({$or: [{'inputs.prev_out.addr': hash}, {'out.addr': hash}]}, {'out.value': 1, _id: 0, fee: 1});
    }
    let total = 0;
    txs.forEach(tx => {
        if (tx.out && tx.out.value && tx.out.value.length > 0) {
            tx.out.value.forEach(o => {
                total += o;
            });
        }
    });
    return total;
}