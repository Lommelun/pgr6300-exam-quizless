import { CONNECT_TO_ROOM, CREATE_ROOM, REMOVE_ROOM, DISCONNECT_FROM_ROOM } from '../redux/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_ROOM: return state;
    case REMOVE_ROOM: return state;
    case CONNECT_TO_ROOM: return state;
    case DISCONNECT_FROM_ROOM: return state;
    default: return state;
  }
}
