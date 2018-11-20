import { roomConsts } from '../actions/action.types'

export default function (state = [], action) {
  switch (action.type) {
    case roomConsts.CONNECT: return state;
    case roomConsts.DISCONNECT: return state;
    case roomConsts.CREATE: return state;
    case roomConsts.CREATED: return state;
    case roomConsts.REMOVE: return state;
    case roomConsts.REMOVED: return state;
    case roomConsts.USER_CONNECTED: return state;
    case roomConsts.USER_DISCONNECTED: return state;
    default: return state;
  }
}
