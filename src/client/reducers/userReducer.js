import { CREATE_USER, DELETE_USER, UPDATE_USER } from '../redux/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_USER: return state;
    case DELETE_USER: return state;
    case UPDATE_USER: return state;
    default: return state;
  }
}
