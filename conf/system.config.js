/**
 * @description 系统配置文件
 * @module conf/system.config
 */

module.exports = {
    /** 部署环境需要修改，程序运行端口*/
    port: 3001,
    /** debug为true时，为调试模式*/
    debug: true,
    /** blockchainAPI相关的配置 */
    blockchainConfig: {
        bitcoin: {
            /** 基地址 */
            baseUrl: 'https://blockchain.info',
            /** 区块 */
            singleBlock: '/rawblock',
            /** 交易 */
            singleTransaction: '/rawtx',
            /** 图表 */
            charts: '/charts',
            /** 区块高度 */
            blockOfHeight: '/blocklet-height',
            /** 地址 */
            singleAddress: '/rawaddr',
            /** 多地址 */
            multiAddress: '/multiaddr',
            /** 未消费交易输出数组 */
            unspentOutputs : '/unspent',
            /** 余额 */
            balance: '/balance',
            /** 最新区块 */
            latestBlock: '/latestblock',
            /** 未确认交易 */
            unconfirmedTransactions: '/unconfirmed-transactions',
            /** 获取区块（天/池） */
            blocks: '/blocks',
        }
    },
    /** 定时更新相关的配置 */
    cronConfig: {
        /** 轮询时间配置 */
        latestBlockPattern: '0 */5 * * * *'
    }
};