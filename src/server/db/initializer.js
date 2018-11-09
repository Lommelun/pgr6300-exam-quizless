const Quiz = require('./quizRepository')

const quizzes = [
  new Quiz({
    name: "sports",
    questions: [
      {
        question: "What colour jersey is worn by the winners of each stage of the Tour De France?",
        answers: ["Blue", "Spotted white & red", "Green", "Yellow"],
        correctAnswer: "Yellow"
      },
      {
        question: "Name the only heavyweight boxing champion to finish his career of 49 fights without ever having been defeated?",
        answers: ["McGregor", "Khabib", "Lesnar", "Marciano"],
        correctAnswer: "Marciano"
      },
      {
        question: "Which sport does Constantino Rocca play?",
        answers: ["Football", "Golf", "Mountain Biking", "Sailing"],
        correctAnswer: "Golf"
      },
      {
        question: "Name the country where you would find the Cresta Run.",
        answers: ["Belgium", "Switzerland", "Argentina", "Sweden"],
        correctAnswer: "Switzerland"
      },
      {
        question: "How many times was the Men's Tennis Singles at Wimbledon won by Bjorn Borg?",
        answers: ["1", "3", "5", "7"],
        correctAnswer: "5"
      },
      {
        question: "In 2011, which country hosted a Formula 1 race for the first time?",
        answers: ["Mexico", "Netherlands", "India", "Finland"],
        correctAnswer: "India"
      },
      {
        question: "Name the game played on a lawn called a 'crown green'.",
        answers: ["Focaccia", "Boccia", "Bowls", "Panama"],
        correctAnswer: "Bowls"
      },
      {
        question: "Which chess piece can only move diagonally?",
        answers: ["Pawn", "Bishop", "Queen", "Rook"],
        correctAnswer: "Bishop"
      },
      {
        question: "Name the only footballer to have played for Liverpool, Everton, Manchester City and Manchester United.",
        answers: ["Peter Beardsley", "David Beckham", "Kyle Walker", "Ben Davies"],
        correctAnswer: "Peter Beardsley"
      }
    ]
  }),
  new Quiz({
    name: "art",
    questions: [
      {
        question: "Name the three primary colours.",
        answers: ["Red, green and blue", "Red, white and blue", "Red, black and yellow", "Red, yellow and blue"],
        correctAnswer: "Red, yellow and blue"
      },
      {
        question: "What is the painting 'La Gioconda' more usually known as?",
        answers: ["The Starry Night", "Mona Lisa", "The Scream", "The Girl With A Pearl Earring"],
        correctAnswer: "Mona Lisa"
      },
      {
        question: "What does the term 'piano' mean?",
        answers: ["To be played slowly", "To be played softly", "To be played fast", "To be played firmly"],
        correctAnswer: "To be played softly"
      },
      {
        question: "How many valves does a trumpet have?",
        answers: ["2", "4", "3", "5"],
        correctAnswer: "3"
      }
    ]
  }),
  new Quiz({
    name: "gaming",
    questions: [
      {
        question: "Who won League of Legends Worlds 2017?",
        answers: ["SK Telecom 1", "Samsung Galaxy", "Royal Never Give Up", "TSM"],
        correctAnswer: "Samsung Galaxy"
      },
      {
        question: "What's the first 'The legend of Zelda' game that was released on the Nintendo Switch?",
        answers: ["Ocarina of Time", "Minish Cap", "Skyward Sword", "Breath of the Wild"],
        correctAnswer: "Breath of the Wild"
      },
      {
        question: "Who publishes the Grand Theft Auto games?",
        answers: ["Blizzard", "Ubisoft", "EA", "Rockstar"],
        correctAnswer: "Rockstar"
      }
    ]
  })
]

module.exports.initialize = async () => {
  quizzes.forEach(quiz => {
    quiz.save(err => {
      if (err) console.table(err)
    })
  });
}
