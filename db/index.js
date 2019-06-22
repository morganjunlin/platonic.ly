const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  database: 'justfriends'
})

const query = (text, params) => pool.query(text, params)

module.exports = { query }