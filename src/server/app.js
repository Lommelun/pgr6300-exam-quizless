const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const logger = require('morgan')
const env = require('dotenv').config()
const path = require('path')
const cors = require('cors')

const dbInitializer = require('./db/initializer')

const app = express()

dbInitializer.initialize()

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
})

app.use([
  logger('dev'), cors(),
  express.static('public/'), sessionMiddleware,
  bodyParser.json(), bodyParser.urlencoded({ extended: true }),
  passport.initialize(), passport.session()
])

app.use('/api', require('./api/router'))

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
});

module.exports = { sessionMiddleware, app }
