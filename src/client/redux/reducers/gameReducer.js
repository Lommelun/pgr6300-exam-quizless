import { gameConsts } from '../actions/action.types'

export function game(state = {}, action) {
  switch (action.type) {
    case gameConsts.VERIFY_ANSWER_REQUEST:
      return {
        ...state,
        answer: action.payload.answer
      }
    case gameConsts.ANSWER_CORRECT:
      return {
        ...state,
        answerCorrect: true
      }
    case gameConsts.ANSWER_WRONG:
      return {
        ...state,
        answerCorrect: false
      }
    case gameConsts.NEXT_QUESTION:
      return {
        question: action.payload.question,
        answers: action.payload.answers
      }
    case gameConsts.WIN:
      return {
        won: true,
        winner: action.payload.winner,
        scores: action.payload.scores
      }
    case gameConsts.LOSS:
      return {
        won: false,
        winner: action.payload.winner,
        scores: action.payload.scores
      }
    default: return state
  }
}
