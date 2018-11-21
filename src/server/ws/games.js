class ActiveGames {
  constructor() {
    this.games = []
  }

  get(id) {
    return this.games.find(game => game.id === id)
  }

  add(game) {
    this.games.push(game)
  }

  leave(id, user) {
    this.games.forEach(game => {
      if (game.id !== id) return
      game.removeUser(user)
      if (game.users.length === 0) this.remove(game.id)
    })
  }

  getAll() {
    return this.rooms
  }

  remove(roomId) {
    this.rooms = this.rooms.filter(room => room.id !== roomId)
  }
}

module.exports = ActiveGames
