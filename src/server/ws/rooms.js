let rooms = []

const get = id => rooms.find(room => room.id === id)

const add = room => rooms.push(room)

const join = (id, user) => {
  rooms.forEach(room => {
    if (room.id !== id) return
    room.users.push(user)
  })
}

const leave = (id, user) => {
  rooms.forEach(room => {
    if (room.id !== id) return
    room.users = room.users.filter(uid => user !== uid)
  })
}

const getAll = () => rooms

const remove = id => {
  this.rooms = rooms.filter(room => room.id !== id)
}

module.exports = {
  get,
  getAll,
  add,
  remove,
  join,
  leave
}
