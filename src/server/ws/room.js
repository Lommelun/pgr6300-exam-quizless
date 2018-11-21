const crypto = require('crypto')

class Room {
  constructor(initialuser) {
    this.owner = initialuser
    this.users = [initialuser]
    this.id = crypto.randomBytes(16).toString('hex')
  }

  addUser(user) {
    this.users.push(user)
  }

  removeUser(user) {
    this.users = this.users.filter(uid => uid !== user)
  }

  getUsers() {
    return this.users
  }
}

module.exports = Room
