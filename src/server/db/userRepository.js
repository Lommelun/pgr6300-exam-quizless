const db = require('./connection')
const bcrypt = require('bcrypt')

const create = async (username, password) => {
  const saltRounds = 12

  // TODO: Validate username, sanitize?
  return bcrypt.hash(password, saltRounds)
    .then(password_hash => db.query(
      {
        text: 'INSERT INTO users(id, name, password_hash) VALUES($1, $2, $3)',
        values: ['DEFAULT', username, password_hash]
      })
    )
}

const getByName = (username) => {
  return db.query(
    {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username]
    })
}

const getById = (id) => {
  return db.query(
    {
      text: 'SELECT * FROM users WHERE id = $1',
      values: [id]
    })
}

module.exports = {
  create,
  getByName,
  getById
}
