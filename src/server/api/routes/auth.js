const router = require('express').Router()
const User = require('../../db/userRepository').User
const passport = require('passport')

router.post('/authenticate', passport.authenticate('local'), (req, res) => {
  res.status(204).send()
})

router.get('/users/:username', async (req, res) => {
  if (!req.user) {
    res.status(401).send()
    return
  }

  if (req.params.username) {
    const { id, username } = await User.findOne({ username: req.params.username })

    res.status(200).send(JSON.stringify({ id, username }))
    return
  }

  res.status(400).send()
})

router.post('/logout', (req, res) => {
  req.logout()
  res.status(204).send()
});

module.exports = router
