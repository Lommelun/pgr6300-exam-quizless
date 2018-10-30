const { Pool } = require('pg')

module.exports = async () => {
  const pool = new Pool({
    user: "postgres",
    host: "db",
    database: "postgres",
    password: "h723aHdsa73",
    port: 5432
  })

  const initialize = require('./initializer')(pool)

  await pool.connect()
  await initialize.tables()

  return pool
}
