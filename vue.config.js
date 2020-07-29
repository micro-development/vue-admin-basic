/**
 * @author yaimeet
 * @date 2019/11/13
 * @Description
 */
const webpack = require('./src/base-resource/vue-admin-common#master/webpack')

// console.log('basic module vue.config.js webpack', webpack)

module.exports = webpack.init({
    sgPage: {
        title: '-账户中心'
    },
    port: 8002,
    alias: {
        common: webpack.resolve('../vue-admin-common#master')
    }
}).setProxyApi(webpack.resolve('../../../proxyTarget.js')).setProxyList().run()
