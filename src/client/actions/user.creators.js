import { userConsts } from './action.types'

function login(username, password) {
  return dispatch => {
    dispatch(() => { return { type: userConsts.LOGIN_REQUEST, username } });

    fetch('/api/auth/authenticate/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    }).then(JSON.parse)
      .then(user => {
        dispatch(() => { return { type: userConsts.LOGIN_SUCCESS, user } })
      })
      .catch(error => {
        dispatch(() => { return { type: userConsts.LOGIN_FAILURE, error } })
      })
  }
}

function logout() {
  dispatch(() => { return { type: userConsts.LOGOUT_REQUEST } })

  fetch('/api/register/', { method: 'POST' })
    .then(res => {
      dispatch(() => { return { type: userConsts.LOGOUT_SUCCESS } })
    })
    .catch(err => {
      dispatch(() => { return { type: userConsts.LOGOUT_FAILURE } })
    })
}

function register(username, password) {
  dispatch(() => {
    return {
      type: userConsts.REGISTER_REQUEST, user: { username: username, password: password }
    }
  })

  fetch('/api/auth/logout/', { method: 'POST' })
    .then(JSON.parse)
    .then(user => {
      dispatch(() => { return { type: userConsts.REGISTER_SUCCESS, user } })
    })
    .catch(err => {
      dispatch(() => { return { type: userConsts.REGISTER_FAILURE, err } })
    })
}

const userActions = {
  login,
  logout,
  register
}

export default userActions
