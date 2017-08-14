const should = require('should')
const { ERRORS } = require('../lib/constants')
const qcloud = require('../index')

describe('index.js', function () {
    describe('qcloud sdk initialization', function () {
        it('should throw an error when not pass configuration', function () {
            should.throws(function () {
                qcloud.init()
            }, ERRORS.ERR_INIT_SDK_LOST_CONFIG)
        })

        it('should throw an error when configuration lost', function () {
            should.throws(function () {
                qcloud.init({})
            }, ERRORS.ERR_INIT_SDK_LOST_CONFIG)
        })

        it('should not throw any error when configuration passed', function () {
            should.doesNotThrow(function () {
                qcloud.init({
                    appId: '',
                    appSecret: '',
                    wxLoginExpires: 7200,
                    mysql: {
                        host: '127.0.0.1',
                        port: 3306,
                        user: 'root',
                        db: '',
                        pass: '',
                        char: 'utf8'
                    },
                    cos: {
                        region: 'cn-south',
                        fileBucket: '',
                        uploadFolder: ''
                    },
                    serverHost: 'xxx.qcloud.la',
                    tunnelServerUrl: 'https://123456.ws.qcloud.la',
                    tunnelSignatureKey: 'key',
                    qcloudAppId: '1210000000',
                    qcloudSecretId: 'abcdefg',
                    qcloudSecretKey: 'abcdefg',
                    wxMessageToken: '',
                    networkTimeout: 30000
                })
            })
        })
    })
})
