const router = require('express').Router()
const passport = require('passport')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local').Strategy
const userRepository = require('../../db/userRepository')

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  async (username, password, done) => {
    // TODO: implement password check
    done(null, {})
  }
))

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
