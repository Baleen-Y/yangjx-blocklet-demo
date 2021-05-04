/**
 * @fileOverview 加载路由
 * @author yangjx 2021/5/1
 * @module init
 */
const fs = require('fs');
const midInit = require('./middleware/init');
const path = require('path');
const baseDir = blocklet.baseDir;
const config = blocklet.config;
const home = require('./routes/index');
const btcApi = require('./routes/api/btc');
const api = require('./routes/api/index');
module.exports.appendRouter = function (app) {

    /** 加载中间件 */
    app.use('/', midInit.initParams);
    app.use('/api', api);
    app.use('/api/btc', btcApi);
    app.use('/', home);
    /** api路由*/
    let apiRoutePath = path.join(baseDir, 'routes/api');
    fs.readdirSync(apiRoutePath).forEach(function (file) {
        if (~file.indexOf('.js')) {
            let fileName = file.substring(0, file.indexOf('.js'));
            app.use('/api/' + fileName, require(path.join(apiRoutePath, fileName)));
            if (fileName === 'index') {
                app.use('/api', require(path.join(apiRoutePath, fileName)));
            }
        }
    });

    app.use('/api', function (req, res, next) {
        res.statusCode = 404;
        res.end();
    });
    let routePath = path.join(baseDir, 'routes');
    /** 根目录路由 */
    fs.readdirSync(routePath).forEach(function (file) {
        if (~file.indexOf('.js')) {
            let fileName = file.substring(0, file.indexOf('.js'));
            app.use('/' + fileName, require(path.join(routePath, fileName)));
            if (fileName === 'index') {
                app.use('/', require(path.join(routePath, fileName)));
            }
        }
    });

    /** catch 404 and forward to error handler */
    app.use(function (req, res, next) {
        let err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    /** error handlers */

    /** development error handler */
    /** will print stacktrace */
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            if (typeof err === 'string') {
                err = new Error(err);
            }
            res.status(err.status || 500);
            res.json(err.message || err.msg);
        });
    }

    /** production error handler */
    /** no stacktraces leaked to user */
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json(err.message || err.msg);
    });

    return app;
};