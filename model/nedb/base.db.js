/**
 * @fileOverview
 * @author yangjx 2021/5/2
 * @module
 */
'use strict';

const Datastore = require('nedb-promises');
const path = require('path');
const fs = require('fs');

class BaseDb {
    static dbs = {};
    static dbsIndex = {};

    constructor(dbName, indexs) {
        let dbPath = path.join(blocklet.baseDir, 'runtime', 'db');
        let dbFile = path.join(dbPath, dbName + '.db');
        if (!fs.existsSync(dbPath)) {
            fs.mkdirSync(dbPath);
        }
        if (!BaseDb.dbs[dbName]) {
            BaseDb.dbs[dbName] = Datastore.create({filename: dbFile});
            indexs.forEach(index => {
                BaseDb.dbs[dbName].ensureIndex(index);
            })
        }
        this.db = BaseDb.dbs[dbName];
    }

    find(query, projections = {}) {
        return this.db.find(query, Object.assign({_id: 0}, projections));
    }

    findOne(query, projections = {}) {
        return this.db.findOne(query, Object.assign({_id: 0}, projections));
    }

    insertOne(doc) {
        return this.db.insert(doc);
    }

    insertMany(docs) {
        return this.db.insert(docs);
    }

    upsertOne(query, update) {
        return this.db.update(query, update, {upsert: true});
    }

    update(query, update) {
        return this.db.update(query, update);
    }

    updateMany(query, update) {
        return this.db.update(query, update, {multi: true});
    }

    delete(query) {
        return this.db.remove(query);
    }

    count(query) {
        return this.db.count(query);
    }
}

module.exports = BaseDb;