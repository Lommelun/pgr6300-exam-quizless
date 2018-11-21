const games = []

const get = id => games.find(game => game.id === id)

const add = game => games.push(game)

const getAll = () => games

module.exports = {
  get,
  getAll,
  add
}
