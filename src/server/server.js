const app = require('./app').app
const WebScocketHandler = require('./ws/handler')
const fs = require('fs')
const path = require('path')

const server = require('http').createServer(app)

WebScocketHandler(server)

server.listen(
  process.env.SERVER_PORT || 8080,
  () => console.log('Node server: start')
)
