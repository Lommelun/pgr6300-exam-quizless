class ActiveRooms {
  constructor() {
    this.rooms = []
  }

  get(id) {
    return this.rooms.find(room => room.id === id)
  }

  add(room) {
    this.rooms.push(room)
  }

  join(roomId, user) {
    this.rooms.forEach(room => {
      if (room.id !== roomId) return
      room.addUser(user)
    })
  }

  leave(roomId, user) {
    this.rooms.forEach(room => {
      if (room.id !== roomId) return
      room.removeUser(user)
      if (room.users.length === 0) this.remove(room.id)
    })
  }

  getAll() {
    return this.rooms
  }

  remove(roomId) {
    this.rooms = this.rooms.filter(room => room.id !== roomId)
  }
}

module.exports = ActiveRooms
