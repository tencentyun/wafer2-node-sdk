const configs = require('../../config')

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        host: configs.mysql.host,
        user: configs.mysql.user,
        password: configs.mysql.pass,
        database: configs.mysql.db,
        charset: configs.mysql.char
    }
})
