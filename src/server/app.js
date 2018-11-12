const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const logger = require('morgan')
const env = require('dotenv').configure()
const path = require('path')

const dbInitializer = require('./db/initializer')

const app = express()

dbInitializer.initialize()

const session = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
})

app.use([
  logger('dev'),
  express.static('public/'), session,
  bodyParser.json(), bodyParser.urlencoded({ extended: true }),
  passport.initialize(), passport.session()
])

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../../public/index.html'))
})

app.use('/api', require('./api/router'))

module.exports = { session, app }
