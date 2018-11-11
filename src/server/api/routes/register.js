const router = require('express').Router()
const User = require('../../db/userRepository').User
const passport = require('passport')

router.post('/signup', (req, res) => {
  const user = new User({ username: req.body.username, password: req.body.password })

  user.save(err => {
    if (err) { res.status(400).send(); return }

    passport.authenticate('local')(req, res, () => {
      req.session.save(() => {
        if (err) return next(err)

        res.status(204).send()
      })
    })
  })
})

module.exports = router
