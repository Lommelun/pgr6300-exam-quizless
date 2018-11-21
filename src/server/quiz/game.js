const Quiz = require('../db/userRepository')

class Game {
  constructor(users = [], room) {
    this.id = room
    this.timer = 0
    this.users = users.map(user => {
      return { id: user, score: 0, answered: false }
    })
  }

  async start() {
    const random = Math.floor(Math.random() * await Quiz.count())
    this.quiz = await Quiz.findOne().skip(random)

    this.resetTimer()
    this.currentQuestion = this.quiz.questions.splice(Math.random() * this.quiz.questions.length, 1)
  }

  removeUser(id) {
    this.users = this.users.filter(user => user.id !== id)
      .map(user => { return { id: user.id, score: 0, answered: false } })
  }

  nextQuestion() {
    if (this.users.filter(user => !user.answered).length === 0) return false

    this.currentQuestion = this.quiz.questions.splice(Math.random() * this.quiz.questions.length, 1)
    this.users.forEach(user => user.answered = false)

    this.resetTimer()

    return true
  }

  getCurrentQuestion() {
    return this.currentQuestion
  }

  verifyAnswer(answer, user) {
    this.users.forEach(userid => {
      userid.answered = true
      if (answer !== this.quiz.currentQuestion.correctAnswer) return
      if (userid === user) userid.score += 1000 - (this.timer + this.currentTime()) * 50
    })
  }

  resetTimer() {
    this.timer = this.currentTime()
  }

  currentTime() {
    return new Date().getTime() / 1000
  }
}

module.exports = Game
