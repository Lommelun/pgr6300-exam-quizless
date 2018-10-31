const { Pool } = require('pg-rxjs')

const connector = async () => {
  const pool = new Pool('postgres://postgres:h723aHdsa73@db:5432/postgres')

  const initialize = require('./initializer')(pool)
  await initialize.tables().subscribe();

  return pool
}

connector()

module.exports = connector
