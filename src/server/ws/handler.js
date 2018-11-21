const session = require('../app').session
const socketIo = require('socket.io')
const crypto = require("crypto")
const Game = require('../quiz/game')
const gameC = require('./ws.consts').gameConsts
const roomC = require('./ws.consts').roomConsts
const rooms = require('./rooms')
const games = require('./games')

let io
const start = (server) => {
  io = socketIo(server)

  io.on('connection', socket => {
    console.log(`Connected to ${socket.id}`)

    if (rooms.getAll().length === 0) {
      const room = {
        owner: socket.client.id,
        id: crypto.randomBytes(16).toString('hex'),
        users: [socket.client.id]
      }

      rooms.add(room)
      console.log(`Created room on: ${socket.id}, \nroom :: ${room.id}`)

      socket.emit(roomC.CREATED, { rooms: rooms.getAll() })
    }

    socket.on(roomC.GET_ALL, () => {
      socket.emit(roomC.GOT_ALL, { rooms: rooms.getAll() })
    })

    socket.on(roomC.CREATE, () => {
      console.log(`Create room on: ${socket.id}`)

      const id = crypto.randomBytes(16).toString('hex')
      const room = {
        owner: socket.id,
        id: id,
        users: [socket.id]
      }

      rooms.add(room)
      console.log(`Created room on: ${socket.id}, \nroom :: ${room.id}`)

      socket.emit(roomC.CREATED, { rooms: rooms.getAll() })
    })

    socket.on(roomC.REMOVE, room => {
      if (socket.client.id !== rooms.get(room).owner) return

      rooms.remove(room)
      console.log(`Removed room on: ${socket.id}, \nroom :: ${room}`)

      socket.emit(roomC.REMOVED, { rooms: rooms.getAll() })
    })

    socket.on(roomC.CONNECTED, room => {
      console.log(`${socket.id} connected to room  ${room}`)

      rooms.join(room, socket.client.id)
      console.log(`${socket.id} joined room  ${room}`)

      socket.to(room).emit(roomC.USER_CONNECTED, { room: rooms.getAll() })
    })

    socket.on(roomC.DISCONNECTED, room => {
      rooms.leave(room, socket.id)
      console.log(`${socket.id} left room ${room}`)

      socket.to(room).emit(roomC.USER_DISCONNECTED, { room: rooms.getAll() })
    })

    socket.on(gameC.CREATE, async room => {
      console.log(`Creating game for room ${room}, owner: ${room.get(room).id}`)
      const game = new Game(rooms.get(room).users, room)
      games.add(game)
      console.log(`Added game ${game.id}`)

      console.log(`Starting game ${game.id}`)
      await game.start()
      console.log(`Game with id ${game.id} started`)

      socket.to(room).emit(gameC.CREATED, game)
    })

    socket.on(gameC.VERIFY_ANSWER_REQUEST, (answer, room) => {
      const game = games.get(room)
      console.log(`Verifying answer ${answer} for ${game.id}`)

      if (game.verifyAnswer(answer, socket.id)) {
        socket.emit(gameC.ANSWER_CORRECT)
      } else {
        socket.emit(gameC.ANSWER_WRONG)
      }

      console.log(`Checking if everyone answered in ${game.id}`)
      if (game.nextQuestion()) {
        console.log(`Dispatching next question for ${game.id}`)
        socket.to(room).emit(gameC.NEXT_QUESTION, game.getCurrentQuestion())
      }
    })

    socket.on('disconnect', () => {
      console.log(`Disconnected from ${socket.id}`)
      rooms.leave(socket.id)
    })
  })
}

module.exports = start
