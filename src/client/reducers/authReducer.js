import { userConsts } from '../actions/action.types'

const initialState = JSON.parse(localStorage.getItem('user')) ? { loggedIn: true, user: user } : {}

export default (state = initialState, action) => {
  switch (action.type) {
    case userConsts.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: { username: action.username }
      }
    case userConsts.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      }
    case userConsts.LOGIN_FAILURE: return {}
    case userConsts.LOGOUT_REQUEST: return {}
    case userConsts.LOGOUT_SUCCESS: return {}
    case userConsts.LOGOUT_FAILURE: return {}
    default: return state
  }
}
