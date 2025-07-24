const { Pool } = require('pg')

const pool = new Pool({
    user: 'post',
    host: 'postgre',
    database: 'toko_buku',
    password: 'posgajah',
    port: '7555'
})

module.exports = pool;