const router = require('express').Router()
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../db/userRepository').User
const verify = require('../../db/userRepository').verify

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    const verified = await verify(username, password)

    if (!verified) {
      return done(null, false, { message: 'Invalid username/password' })
    }

    return done(null, await User.findOne({ username: username }))
  }
))

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  const user = User.findOne({ _id: id })
  return (user) ? done(null, user) : done(null, false)
})

router.all('/', (req, res) => {
  res.status(400).send(JSON.stringify({
    error: "Bad request: You probably want to use one of the endpoints, see the list 'entrypoints'",
    endpoints: [
      '/authenticate?username={username}&password={password}',
    ]
  }))
})

router.post('/authenticate', passport.authenticate('local'), (req, res) => {
  res.status(204).send()
})

router.post('/logout', (req, res) => {
  req.logout()
  res.status(204).send()
});

module.exports = router
