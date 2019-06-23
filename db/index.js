const { Pool } = require('pg')

const pool = new Pool({
  host: 'localhost',
  database: 'justfriends',
  user: 'postgres'
})

const query = (text, params) => pool.query(text, params)

module.exports = { query }