const should = require('should')
const config = require('../config')

describe('config.js', function () {
    describe('set configs', function () {
        it('should set properties on closure', function () {
            config.set({ _a: 1 })
            should.equal(config._a, 1)
        })

        it('should set properties recursive when property\'s value is a object', function () {
            config.set({ _b: { _c: 1 } })
            should.equal(config._b._c, 1)
        })
    })
})
