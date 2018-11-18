import { userConsts } from '../actions/action.types'

export default (state = {}, action) => {
  switch (action.type) {
    case userConsts.REGISTER_REQUEST:
      return {
        registering: true
      }
    case userConsts.REGISTER_SUCCESS: return {}
    case userConsts.REGISTER_FAILURE: return {}
    default: return state
  }
}
