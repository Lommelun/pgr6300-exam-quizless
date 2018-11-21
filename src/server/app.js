const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const logger = require('morgan')
const env = require('dotenv').config()
const path = require('path')
const cors = require('cors')
const verify = require('./db/userRepository').verify
const User = require('./db/userRepository').User

const dbInitializer = require('./db/initializer')

const app = express()

dbInitializer.initialize()

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET,
  saveUninitialized: true,
  resave: false
})

app.use(logger('dev'))
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(sessionMiddleware)
app.use(express.static('public/'))

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async function (username, password, done) {
    const ok = await verify(username, password)

    if (!ok) {
      return done(null, false, { message: 'Invalid username/password' })
    }

    const user = await User.findOne({ username: username })
    return done(null, user)
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  const user = await User.findOne({ _id: id })

  if (user !== undefined) {
    done(null, user)
  } else {
    done(null, false)
  }
})

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./api/router'))

app.use((req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../../public/index.html'));
})

module.exports = { sessionMiddleware, app }
