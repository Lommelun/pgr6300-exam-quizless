const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
const path = require('path')

const api = require('./api/router')

const dbInitializer = require('./db/initializer')
const env = require('../../env')

const app = express()
const port = 8080

dbInitializer.initialize()

app.use(logger('dev'))
app.use(express.static('public/'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}))


app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'))
})


app.use('/api', api)

app.listen(port, () => { console.log("Node server: start") })
