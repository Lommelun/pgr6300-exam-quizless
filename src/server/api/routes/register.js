const router = require('express').Router()
const repository = require('../db/userRepository')


router.post('/api/register', (req, res) => {
  const username = req.body.username
  const password = req.body.password

  if (username == undefined || password == undefined) {
    res.status(400).send()
    return
  }

  repository.create(username, password)
    .then(res.status(201).send())
    .catch(res.status(400).send())
})

module.exports = router
