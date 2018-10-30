module.exports = (db) => {
  const module = {}

  module.tables = () => {
    return db.query(
      `CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      username VARCHAR(14),
      password_hash VARCHAR(255));

    CREATE TABLE IF NOT EXISTS user_scores(
      userId        INT REFERENCES users(id),
      score         INT,
      PRIMARY KEY (userId));`
    )
  }

  return module
}
