/**
 * @fileOverview 定义接口返回的code和msg
 * @author menglb 2020/6/13
 * @module model/retSchema
 * @description
 */
'use strict';

module.exports = {
    'SUCCESS': {code: 0, msg: '成功'},
    'SUCCESS_LOGIN': {code: 0, msg: '用户登录成功'},
    'FAIL_PARAM_MISS': {code: 1, msg: '参数不全'},
    'FAIL_UNEXPECTED': {code: -99, msg: '未知错误'},

    'FAIL_OAUTH_PARAM_MISS': {code: 1000, msg: '参数不全'},
    'FAIL_OAUTH_CLIENTCODE_MISS': {code: 1001, msg: '缺少应用标识'},
    'FAIL_OAUTH_RETURL_MISS': {code: 1002, msg: '缺少回调地址'},
    'FAIL_OAUTH_CLIENT_MISS': {code: 1003, msg: '应用不存在'},
    'FAIL_OAUTH_CLIENT_DISABLED': {code: 1004, msg: '应用已禁用'},
    'FAIL_OAUTH_RETURL_ERROR': {code: 1005, msg: '回调地址错误'},
    'FAIL_OAUTH_CLIENTSECRET_MISS': {code: 1006, msg: '缺少应用秘钥'},
    'FAIL_OAUTH_CLIENTSECRET_INVALID': {code: 1007, msg: '应用秘钥无效'},
    'FAIL_OAUTH_AUTHCODE_MISS': {code: 1008, msg: '缺少授权码'},
    'FAIL_OAUTH_AUTHCODE_INVALID': {code: 1009, msg: '授权码无效'},

    'FAIL_SMS_SEND_OFTEN': {code: 2001, msg: '验证码发送过于频繁'},

    'FAIL_TOKEN_MISS': {code: 4001, msg: '缺少token'},
    'FAIL_TOKEN_INVALID': {code: 4002, msg: 'token无效'},

    'FAIL_USER_NOAUTHORITY': {code: 6000, msg: '没有进行此项操作的权限'},
    'FAIL_USER_VCODE_MISS': {code: 6001, msg: '缺少验证码'},
    'FAIL_USER_VCODE_INVALID': {code: 6002, msg: '验证码错误'},
    'FAIL_USER_LOGIN_ERROR': {code: 6003, msg: '用户登录出错'},
    'FAIL_USER_ERRORNAMEORPWD': {code: 6004, msg: '账号或密码错误'},
    'FAIL_USER_EXPIRE': {code: 6005, msg: '用户已过期'},
    'FAIL_USER_DISABLE': {code: 6006, msg: '该账号被禁止登录'},
    'FAIL_USER_WECHAT_UNBIND': {code: 6007, msg: '未绑定微信账号'},
    'FAIL_USER_WECHAT_BIND_ERROR': {code: 6008, msg: '绑定微信失败'},
    'FAIL_USER_REGISTER_ERROR': {code: 6009, msg: '用户注册失败'}

};
