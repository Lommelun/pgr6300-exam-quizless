import { userConsts } from '../actions/action.types'

export default function (state = {}, action) {
  switch (action.type) {
    case userConsts.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: { username: action.payload.username }
      }
    case userConsts.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: { username: action.payload.username, id: action.payload.id }
      }
    case userConsts.LOGIN_FAILURE: return state
    case userConsts.LOGOUT_REQUEST: return state
    case userConsts.LOGOUT_SUCCESS: return state
    case userConsts.LOGOUT_FAILURE: return state
    default: return state
  }
}
