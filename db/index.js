const { Pool } = require('pg')

const pool = new Pool({
  // host: '',
  database: 'platonicly',
  // user: '',
  password: 'password',
  port: 5432
})

const query = (text, params) => pool.query(text, params)

module.exports = { query }
