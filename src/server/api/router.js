const router = require('express').Router()
const auth = require('./routes/auth')
const register = require('./routes/register')

router.use('/auth', auth)
router.use('/register', register)

module.exports = router
