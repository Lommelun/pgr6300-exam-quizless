const app = require('./app').app
const WebScocketHandler = require('./ws/handler')
const fs = require('fs')
const path = require('path')

const server = require('https').createServer({
  key: fs.readFileSync(path.resolve(__dirname + "/cert/keys/key.pem")),
  cert: fs.readFileSync(path.resolve(__dirname + "/cert/keys/cert.pem"))
}, app)

WebScocketHandler(server)

server.listen(
  process.env.SERVER_PORT || 8080,
  () => console.log('Node server: start')
)
