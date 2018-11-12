const router = require('express').Router()
const User = require('../../db/userRepository').User
const passport = require('passport')

router.post('/', (req, res) => {
  const user = new User({ username: req.body.username, password: req.body.password })

  user.save(err => {
    if (err) {
      res.status(400).send({ messages: generateErrorMessages(err) })
      return
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save(() => {
        if (err) return next(err)

        res.status(204).send()
      })
    })
  })
})

const generateErrorMessages = (err) => {
  const errors = err.errors
  if (!(errors.password || errors.username)) return [err]

  const errorMessages = []
  if (errors.username) {
    switch (errors.username.kind) {
      case 'unique': errorMessages.push(`User with username: '${errors.username.value}' already exists, please choose another`); break
      case 'required': errorMessages.push('Username empty and is required'); break
      default: errorMessages.push({ username: errors.username })
    }
  }
  if (errors.password) {
    switch (errors.password.kind) {
      case 'required': errorMessages.push('Password empty and is required'); break
      default: errorMessages.push({ password: errors.password })
    }
  }

  return errorMessages
}

module.exports = router
