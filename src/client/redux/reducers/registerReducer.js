import { userConsts } from '../actions/action.types'

export default function (state = {}, action) {
  switch (action.type) {
    case userConsts.REGISTER_REQUEST:
      return {
        registering: true
      }
    case userConsts.REGISTER_SUCCESS: return state
    case userConsts.REGISTER_FAILURE: return state
    default: return state
  }
}
