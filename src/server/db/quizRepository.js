const mongoose = require('./connection')
const Schema = require('mongoose').Schema

const quizSchema = new Schema({
  name: String,
  questions: [
    {
      question: String,
      answers: [String],
      correctAnswer: String
    }
  ]
})

const QuizModel = mongoose.model('Quiz', quizSchema)

module.exports = QuizModel
