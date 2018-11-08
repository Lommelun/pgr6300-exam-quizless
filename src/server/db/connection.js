const mongoose = require('mongoose')
mongoose.connect('mongodb://quizmaster:asdH2djaSDah3@db:27017/quizzless', { useNewUrlParser: true })
module.exports = mongoose
