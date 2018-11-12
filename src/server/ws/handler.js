const session = require('../app').session
const socketIo = require('socket.io')

let io
const start = (server) => {
  io = socketIo(server)

  io.on('connection', (socket) => {
    console.log(`Connected to ${socket.id}`)

    socket.on('disconnect', () => {
      console.log(`Disconnected ${socket.id}`)
    })
  })
}

module.exports = start
