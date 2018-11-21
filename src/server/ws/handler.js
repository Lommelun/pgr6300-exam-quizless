const session = require('../app').sessionMiddleware
const socketIo = require('socket.io')
const Game = require('../quiz/game')
const Room = require('./room')
const GameConstant = require('./ws.consts').gameConsts
const RoomConstant = require('./ws.consts').roomConsts
const ActiveRooms = require('./rooms')
const ActiveGames = require('./games')

let io
const games = new ActiveGames()
const rooms = new ActiveRooms()

const start = (server) => {
  io = socketIo(server)

  io.use(function (socket, next) {
    session(socket.request, {}, next)
  })

  io.use((socket, next) => {
    if (socket.request.session.passport) return next()
    next(new Error("Not authenticated"))
  })

  io.on('connection', socket => {
    console.log(`Connected to ${socket.id}, user: ${socket.request.session.passport.user}`)

    socket.on(RoomConstant.GET_ALL, () => {
      socket.emit(RoomConstant.GOT_ALL, { rooms: rooms.getAll() })
    })

    socket.on(RoomConstant.CREATE, () => {
      console.log(`Create room for: ${socket.request.session.passport.user}`)
      const _room = new Room(socket.request.session.passport.user)

      rooms.add(_room)
      console.log(`Created room for: ${socket.request.session.passport.user}, \nroom :: ${_room.id}`)

      socket.emit(RoomConstant.CREATED, { rooms: rooms.getAll() })
    })

    socket.on(RoomConstant.REMOVE, roomId => {
      const _room = rooms.get(roomId)
      if (socket.request.session.passport.user !== (_room ? _room.owner : false)) return

      rooms.remove(roomId)
      console.log(`Removed room for: ${socket.request.session.passport.user}, \nroom :: ${roomId}`)

      socket.emit(RoomConstant.REMOVED, { rooms: rooms.getAll() })
    })

    socket.on(RoomConstant.CONNECT, roomId => {
      console.log(`${socket.request.session.passport.user} connected to room  ${roomId}`)

      rooms.join(roomId, socket.request.session.passport.user)
      console.log(`${socket.request.session.passport.user} joined room  ${roomId}`)

      socket.to(roomId).emit(RoomConstant.USER_CONNECTED, { room: rooms.getAll() })
    })

    socket.on(RoomConstant.DISCONNECT, roomId => {
      rooms.leave(roomId, socket.request.session.passport.user)
      console.log(`${socket.request.session.passport.user} left room ${roomId}`)

      socket.to(roomId).emit(RoomConstant.USER_DISCONNECTED, { room: rooms.getAll() })
    })

    socket.on(GameConstant.CREATE, async roomId => {
      console.log(`Creating game for room ${roomId}, owner: ${rooms.get(roomId).owner}`)
      const _game = new Game(rooms.get(roomId).getUsers(), roomId)
      games.add(_game)
      console.log(`Added game ${_game.id}`)

      console.log(`Starting game ${_game.id}`)
      await _game.start()
      console.log(`Game with id ${_game.id} started`)

      socket.to(roomId).emit(GameConstant.CREATED, _game)
    })

    socket.on(GameConstant.VERIFY_ANSWER_REQUEST, (answer, roomId) => {
      const _game = games.get(roomId)
      console.log(`Verifying answer ${answer} for ${_game.id}`)

      if (_game.verifyAnswer(answer, socket.request.session.passport.user)) {
        socket.emit(GameConstant.ANSWER_CORRECT)
      } else {
        socket.emit(GameConstant.ANSWER_WRONG)
      }

      console.log(`Checking if everyone answered in ${_game.id}`)
      if (_game.nextQuestion()) {
        console.log(`Dispatching next question for ${_game.id}`)
        socket.to(roomId).emit(GameConstant.NEXT_QUESTION, _game.getCurrentQuestion())
      }
    })

    socket.on('disconnect', () => {
      console.log(`Disconnected from ${socket.id}`)
      rooms.leave(socket.request.session.passport.user)
    })
  })
}

module.exports = start
