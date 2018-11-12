const app = require('./app').app

const server = require('http').Server(app)

server.listen(
  process.env.SERVER_PORT || 8080,
  () => console.log('Node server: start')
)
