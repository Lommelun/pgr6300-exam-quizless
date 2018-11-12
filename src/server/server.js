const app = require('./app').app
const WebScocketHandler = require('./ws/handler')

const server = require('http').Server(app)
WebScocketHandler(server)

server.listen(
  process.env.SERVER_PORT || 8080,
  () => console.log('Node server: start')
)
