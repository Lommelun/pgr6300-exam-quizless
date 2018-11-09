const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
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

router.use(passport.initialize())
router.use(passport.session())

router.post('/authenticate', (req, res) => {
  if (username == undefined || password == undefined) {
    res.status(400).send()
    return
  }

  userRepository.get(req.body.username)
    .then(res.status(200).send())
    .catch(res.status(400).send())
})

module.exports = router
