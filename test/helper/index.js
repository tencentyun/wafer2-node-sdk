const should = require('should')
const crypto = require('crypto')
const md5 = require('../../lib/helper/md5')
const sha1 = require('../../lib/helper/sha1')
const aesDecrypt = require('../../lib/helper/aesDecrypt')

describe('helper/md5.js', function () {
    it('should equal between md5 function output and raw crypto output', function () {
        const str = 'hello world'
        const md5Str = md5(str)
        const expected = crypto.createHash('md5').update(str).digest('hex')
        should.equal(md5Str, expected)
    })
})

describe('helper/sha1.js', function () {
    it('should equal between sha1 function output and raw crypto output', function () {
        const str = 'hello world'
        const sha1Str = sha1(str)
        const expected = crypto.createHash('sha1').update(str).digest('hex')
        should.equal(sha1Str, expected)
    })
})

describe('helper/aesDecrypt.js', function () {
    it('should equal between aesDecrypt function output and raw crypto output', function () {
        const key = new Buffer('tiihtNczf5v6AKRyjwEUhQ==', 'base64')
        const iv = new Buffer('r7BXXKkLb8qrSNn05n0qiA==', 'base64')
        const data = new Buffer(
            'CiyLU1Aw2KjvrjMdj8YKliAjtP4gsMZM' +
            'QmRzooG2xrDcvSnxIMXFufNstNGTyaGS' +
            '9uT5geRa0W4oTOb1WT7fJlAC+oNPdbB+' +
            '3hVbJSRgv+4lGOETKUQz6OYStslQ142d' +
            'NCuabNPGBzlooOmB231qMM85d2/fV6Ch' +
            'evvXvQP8Hkue1poOFtnEtpyxVLW1zAo6' +
            '/1Xx1COxFvrc2d7UL/lmHInNlxuacJXw' +
            'u0fjpXfz/YqYzBIBzD6WUfTIF9GRHpOn' +
            '/Hz7saL8xz+W//FRAUid1OksQaQx4CMs' +
            '8LOddcQhULW4ucetDf96JcR3g0gfRK4P' +
            'C7E/r7Z6xNrXd2UIeorGj5Ef7b1pJAYB' +
            '6Y5anaHqZ9J6nKEBvB4DnNLIVWSgARns' +
            '/8wR2SiRS7MNACwTyrGvt9ts8p12PKFd' +
            'lqYTopNHR1Vf7XjfhQlVsAJdNiKdYmYV' +
            'oKlaRv85IfVunYzO0IKXsyl7JCUjCpoG' +
            '20f0a04COwfneQAGGwd5oa+T8yO5hzuy' +
            'Db/XcxxmK01EpqOyuxINew==', 'base64')
        const cipher = crypto.createCipheriv('aes-128-cbc', key, iv)
        let crypted = cipher.update(data, 'utf8', 'binary')
        crypted += cipher.final('binary')
        crypted = new Buffer(crypted, 'binary').toString('base64')
        should.equal(aesDecrypt(key, iv, crypted), data)
    })
})
