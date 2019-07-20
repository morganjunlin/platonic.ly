const { Pool } = require('pg')

const pool = new Pool({
  host: 'ec2-18-216-16-167.us-east-2.compute.amazonaws.com',
  database: 'justfriends',
  user: 'ubuntu',
  password: 'password',
  // max: 40,
  // // min: 8,
  // idleTimeoutMillis: 30000,
  // connectionTimeoutMillis: 2000,
  port: 5432
})

const query = (text, params) => pool.query(text, params)

module.exports = { query }