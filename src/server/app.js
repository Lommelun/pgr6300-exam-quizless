const express = require('express')
const logger = require('morgan')
const dbInitializer = require('./db/initializer')
const path = require('path')
const app = express()

const port = 8080;

dbInitializer.initialize()

app.use(logger('dev'))
app.use(express.json())

app.use(express.static('public/'))
app.use("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'))
})

app.use('/api', require('./api/router'))

app.listen(port, () => { console.log("Node server: start") })
