const mongoose = require('./connection')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = require('mongoose').Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true }
})

userSchema.plugin(uniqueValidator)
userSchema.pre('save', function (next) {
  const user = this
  const saltRounds = 12

  if (!user.isModified('password')) return next()

  bcrypt.hash(user.password, saltRounds)
    .then(password_hash => {
      user.password = password_hash
      next()
    })
    .catch(err => next(err))
})

const User = mongoose.model('User', userSchema)

const verify = async (username, password) => {
  const user = await User.findOne({ username: username }, 'password').exec()
  return await bcrypt.compare(password, user.password)
}

module.exports = {
  User,
  verify
}
