import { AUTHENTICATE_USER } from '../redux/actionTypes'

export default (state = [], action) => {
  switch (action.type) {
    case AUTHENTICATE_USER: return state;
    default: return state;
  }
}
