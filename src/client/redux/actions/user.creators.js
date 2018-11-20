import { userConsts } from './action.types'

const login = (username, password) => dispatch => {
  dispatch(request(username))

  fetch('/api/auth/authenticate/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(async res => (res.status === 204)
      ? fetch(`/api/auth/users/${username}`)
      : Promise.reject(`Could not authenticate user: ${username}`))
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

const logout = () => dispatch => {
  dispatch(request())

  fetch('/api/auth/logout/', { method: 'POST' })
    .then(() => dispatch(success()))
    .catch(err => dispatch(fail(err)))

  function request() { return { type: userConsts.LOGOUT_REQUEST } }
  function success() { return { type: userConsts.LOGOUT_SUCCESS } }
  function fail(error) { return { type: userConsts.LOGOUT_FAILURE, payload: { error } } }
}

const register = (username, password) => dispatch => {
  dispatch(request(username, password))

  fetch('/api/register/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(res => (res.status === 204)
      ? fetch(`/api/auth/users/${username}`)
      : Promise.reject(`Could not register new user: ${username}`))
    .then(res => res.json())
    .then(user => dispatch(success(user)))
    .catch(err => dispatch(fail(err)))

  function request(username, password) {
    return {
      type: userConsts.REGISTER_REQUEST, user: { username: username, password: password }
    }
  }

  function success(user) {
    return () => Promise.all([
      dispatch(authSuccess(user)),
      dispatch(registerSuccess(user))
    ])
  }

  function fail(error) {
    return () => Promise.all([
      dispatch(registerFail(error)),
      dispatch(authFail(error))
    ])
  }

  function registerSuccess(user) {
    return { type: userConsts.REGISTER_SUCCESS, payload: { username: user.username } }
  }

  function registerFail(error) {
    return { type: userConsts.REGISTER_FAILURE, payload: { error } }
  }

  function authSuccess(user) {
    return { type: userConsts.LOGIN_SUCCESS, payload: { user } }
  }

  function authFail(error) {
    return { type: userConsts.LOGIN_FAILURE, payload: { error } }
  }
}

export default {
  login,
  logout,
  register
}
