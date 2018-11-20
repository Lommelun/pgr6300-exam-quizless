const session = require('../app').session
const socketIo = require('socket.io')
const wstypes = require('./ws.consts')

let io
const start = (server) => {
  io = socketIo(server)

  io.to(`${roomName}`).emit("newQuestion", { question: "Question", "answers": [] })

  io.on('connection', socket => {
    console.log(`Connected to ${socket.id}`)

    socket.on(wstypes.roomConsts.CREATE, () => {
      // TODO: create room
      socket.emit(wstypes.roomConsts.CREATED, { rooms: [] })
    })

    socket.on(wstypes.roomConsts.REMOVE, () => {
      // TODO: delete room
      socket.emit(wstypes.roomConsts.REMOVED, { rooms: [] })
    })

    socket.on(wstypes.roomConsts.CONNECTED, () => {
      // TODO: register user in room
      socket.emit(wstypes.roomConsts.USER_CONNECTED, { room: [] })
    })

    socket.on(wstypes.gameConsts.VERIFY_ANSWER_REQUEST, () => {
      // TODO: verify answer
      socket.emit(wstypes.gameConsts.ANSWER_CORRECT)
      socket.emit(wstypes.gameConsts.ANSWER_WRONG)
      socket.emit(wstypes.gameConsts.WIN)
      socket.emit(wstypes.gameConsts.LOSS)
    })

    socket.on('disconnect', () => {
      console.log(`Disconnected from ${socket.id}`)
    })
  })
}

module.exports = start
