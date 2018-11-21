const session = require('../app').session
const socketIo = require('socket.io')
const crypto = require("crypto")
const Game = require('../quiz/game')
const Room = require('./room')
const gameC = require('./ws.consts').gameConsts
const roomC = require('./ws.consts').roomConsts
const ActiveRooms = require('./rooms')
const ActiveGames = require('./games')

let io
const games = new ActiveGames()
const rooms = new ActiveRooms()

const start = (server) => {
  io = socketIo(server)

  io.on('connection', socket => {
    console.log(`Connected to ${socket.id}`)

    if (rooms.getAll().length === 0) {
      const _room = new Room(socket.id)

      rooms.add(_room)
      console.log(`Created room on: ${socket.id}, \nroom :: ${_room.id}`)

      socket.emit(roomC.CREATED, { rooms: rooms.getAll() })
    }

    socket.on(roomC.GET_ALL, () => {
      socket.emit(roomC.GOT_ALL, { rooms: rooms.getAll() })
    })

    socket.on(roomC.CREATE, () => {
      console.log(`Create room on: ${socket.id}`)
      const _room = new Room(socket.id)

      rooms.add(_room)
      console.log(`Created room on: ${socket.id}, \nroom :: ${_room.id}`)

      socket.emit(roomC.CREATED, { rooms: rooms.getAll() })
    })

    socket.on(roomC.REMOVE, roomId => {
      const _room = rooms.get(roomId)
      if (socket.id !== (_room ? _room.owner : false)) return

      rooms.remove(roomId)
      console.log(`Removed room on: ${socket.id}, \nroom :: ${roomId}`)

      socket.emit(roomC.REMOVED, { rooms: rooms.getAll() })
    })

    socket.on(roomC.CONNECTED, roomId => {
      console.log(`${socket.id} connected to room  ${roomId}`)

      rooms.join(roomId, socket.id)
      console.log(`${socket.id} joined room  ${roomId}`)

      socket.to(roomId).emit(roomC.USER_CONNECTED, { room: rooms.getAll() })
    })

    socket.on(roomC.DISCONNECTED, roomId => {
      rooms.leave(roomId, socket.id)
      console.log(`${socket.id} left room ${roomId}`)

      socket.to(roomId).emit(roomC.USER_DISCONNECTED, { room: rooms.getAll() })
    })

    socket.on(gameC.CREATE, async roomId => {
      console.log(`Creating game for room ${roomId}, owner: ${rooms.get(roomId).owner}`)
      const _game = new Game(rooms.get(roomId).getUsers(), roomId)
      games.add(_game)
      console.log(`Added game ${_game.id}`)

      console.log(`Starting game ${_game.id}`)
      await _game.start()
      console.log(`Game with id ${_game.id} started`)

      socket.to(roomId).emit(gameC.CREATED, _game)
    })

    socket.on(gameC.VERIFY_ANSWER_REQUEST, (answer, roomId) => {
      const _game = games.get(roomId)
      console.log(`Verifying answer ${answer} for ${_game.id}`)

      if (_game.verifyAnswer(answer, socket.id)) {
        socket.emit(gameC.ANSWER_CORRECT)
      } else {
        socket.emit(gameC.ANSWER_WRONG)
      }

      console.log(`Checking if everyone answered in ${_game.id}`)
      if (_game.nextQuestion()) {
        console.log(`Dispatching next question for ${_game.id}`)
        socket.to(roomId).emit(gameC.NEXT_QUESTION, _game.getCurrentQuestion())
      }
    })

    socket.on('disconnect', () => {
      console.log(`Disconnected from ${socket.id}`)
      rooms.leave(socket.id)
    })
  })
}

module.exports = start
