const { Pool } = require('pg')

const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "postgres",
  password: "h723aHdsa73",
  port: 5432
})

module.exports = pool