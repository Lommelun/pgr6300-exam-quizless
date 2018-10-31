const router = require('express').Router()

router.use('/auth', require('./routes/auth'))
router.use('/register', require('./routes/register'))

module.exports = router
