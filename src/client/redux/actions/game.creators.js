import { gameConsts } from './action.types'

const create = () => dispatch => {
  dispatch(request())

  fetch('/api/auth/authenticate/', { method: 'POST' })
    .then(async res => (res.status === 204))
    .then(res => res.json())
    .then(user => dispatch(success(user)))
    .catch(err => dispatch(fail(err)))

  function request(username) {
    return { type: userConsts.LOGIN_REQUEST, payload: { username } }
  }

  function success(user) {
    return { type: userConsts.LOGIN_SUCCESS, payload: { user } }
  }

  function fail(error) {
    return { type: userConsts.LOGIN_FAILURE, payload: { error } }
  }
}

const verify = answer => dispatch => {
  dispatch(request(answer))

  fetch(`/api/game/verify/${answer.gameId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(answer)
  })
    .then(res => (res.status === 200)
      ? res
      : Promise.reject())
    .then(dispatch(correct()))
    .catch(dispatch(wrong()))

  function request(answer) {
    return { type: gameConsts.VERIFY_ANSWER_REQUEST, payload: { answer } }
  }

  function correct() {
    return { type: gameConsts.ANSWER_WRONG }
  }

  function wrong() {
    return { type: gameConsts.ANSWER_CORRECT }
  }
}

export default {
  create,
  verify
}
