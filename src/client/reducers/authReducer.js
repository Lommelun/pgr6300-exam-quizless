import { userConsts } from '../actions/action.types'

export default (state = {}, action) => {
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
    case userConsts.LOGIN_FAILURE: return {}
    case userConsts.LOGOUT_REQUEST: return {}
    case userConsts.LOGOUT_SUCCESS: return {}
    case userConsts.LOGOUT_FAILURE: return {}
    default: return state
  }
}
