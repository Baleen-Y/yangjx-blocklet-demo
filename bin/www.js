/**
 * @fileOverview
 * @author yangjx 2021/5/1
 * @module
 */
'use strict';
var app = require('../app.js');
// var debug = require('debug')('blocklet-backend');
var http = require('http');
var logger = blocklet.logger;

/**
 * 设置程序监听端口
 */
var port = normalizePort(process.env.BLOCKLET_PORT || '3001');
app.set('port', port);

/**
 * 创建http服务实例
 */
var server = http.createServer(app);

/**
 * 开启服务监听
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * 格式化监听端口
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        /** named pipe */
        return val;
    }

    if (port >= 0) {
        /** port number */
        return port;
    }

    return false;
}

/**
 * 启动错误事件处理
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    /** 错误提示 */
    switch (error.code) {
        case 'EACCES':
            logger.error(bind + ' 权限不足');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            logger.error(bind + ' 端口被占用');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * 正常启动事件处理
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    logger.info('主站点启动成功');
    logger.info('Listening on ' + bind);
}

// const _fnError = async function(err) {
//     blocklet.logger.error(err);
// };
// process.on('uncaughtException', _fnError);
// process.on('unhandledRejection', _fnError);

require('./cron-update');