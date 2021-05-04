/**
 * @fileOverview 日志记录管理类
 * @author menglb
 */

const log4js = require('log4js');
const fs = require('fs');
const path = require('path');

const runtimePath = path.join(blocklet.baseDir, 'runtime');
const logPath = path.join(runtimePath, 'log');
const accessPath = path.join(logPath, 'access');
const infoPath = path.join(logPath, 'info');
const errorPath = path.join(logPath, 'error');

/** 创建记录日志的临时文件夹 */
if (!fs.existsSync(runtimePath)) {
    fs.mkdirSync(runtimePath);
}
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
}
if (fs.existsSync(logPath)) {
    if (!fs.existsSync(accessPath)) {
        fs.mkdirSync(accessPath);
    }
    if (!fs.existsSync(infoPath)) {
        fs.mkdirSync(infoPath);
    }
    if (!fs.existsSync(errorPath)) {
        fs.mkdirSync(errorPath);
    }
}
let log4jsConfigure = {
    "pm2": false,
    "disableClustering": false,
    "appenders": {
        "info": {
            "type": "dateFile",
            "filename": path.join(infoPath, 'info.log'),
            "pattern": "yyyy-MM-dd",
            "maxLogSize": 10240000,
            "backups": 4,
            "alwaysIncludePattern": true,
            "compress": false,
            "keepFileExt": true
        },
        "error": {
            "type": "dateFile",
            "filename": path.join(errorPath, 'error.log'),
            "pattern": "yyyy-MM-dd",
            "separator": "/",
            "maxLogSize": 1024000,
            "backups": 4,
            "alwaysIncludePattern": true,
            "compress": false,
            "keepFileExt": true
        },
        "access": {
            "type": "dateFile",
            "filename": path.join(accessPath, 'access.log'),
            "pattern": "yyyy-MM-dd",
            "separator": "/",
            "maxLogSize": 1024000,
            "backups": 4,
            "alwaysIncludePattern": true,
            "compress": false,
            "keepFileExt": true
        },
        "out": {
            "type": "stdout"
        }
    },
    "categories": {
        "default": {
            "appenders": [
                "out"
            ],
            "level": "DEBUG"
        },
        "infoDebug": {
            "appenders": [
                "info",
                "out"
            ],
            "level": "DEBUG"
        },
        "errorDebug": {
            "appenders": [
                "error",
                "out"
            ],
            "level": "DEBUG"
        },
        "info": {
            "appenders": [
                "info"
            ],
            "level": "INFO"
        },
        "error": {
            "appenders": [
                "error"
            ],
            "level": "ERROR"
        },
        "access": {
            "appenders": ["access"],
            "level": "TRACE"
        }
    }
}
log4js.configure(log4jsConfigure, {reloadSecs: 300});

function getLogger(name) {
    let logger = log4js.getLogger(name);
    return logger;
}

class Logger {
    constructor(debug) {
        this.access = getLogger('access');
        if (debug) {
            this.infoLogger = getLogger('infoDebug');
            this.errorLogger = getLogger('errorDebug');
        } else {
            this.infoLogger = getLogger('info');
            this.errorLogger = getLogger('error');
        }
    }
    info(message, ...args) {
        this.infoLogger.info(message, args);
    }
    error(message, ...args) {
        this.errorLogger.error(message, args);
    }
}

module.exports = Logger;
