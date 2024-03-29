import { roomConsts } from '../actions/action.types'

export function room(state = [], action) {
  switch (action.type) {
    case roomConsts.GET_ALL: return state
    case roomConsts.GOT_ALL:
      return {
        rooms: action.payload.rooms
      }
    case roomConsts.CONNECT:
      return {
        ...state.rooms,
        connecting: true
      }
    case roomConsts.DISCONNECT:
      return {
        ...state.rooms,
        disconnecting: true
      };
    case roomConsts.CREATE: return state
    case roomConsts.CREATED:
      return {
        rooms: action.payload.rooms
      }
    case roomConsts.REMOVE: return state
    case roomConsts.REMOVED:
      return {
        rooms: action.payload.rooms
      }
    case roomConsts.USER_CONNECTED:
      return state
    case roomConsts.USER_DISCONNECTED:
      return state
    default: return state;
  }
}
