import { gameConsts } from './action.types'

function win() {
  return { type: gameConsts.WIN }
}

function loss() {
  return { type: gameConsts.LOSS }
}

function verify(answer) {
  return dispatch => {
    dispatch({ type: gameConsts.VERIFY_ANSWER_REQUEST, payload: answer })
    fetch('/api/quiz/')
  }
}

export default alertActions = {
  success,
  error
}
