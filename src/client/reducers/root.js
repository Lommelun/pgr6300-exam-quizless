import { combineReducers } from 'redux'
import auth from './authReducer'
import room from './registerReducer'
import user from './roomReducer'

export default combineReducers({ auth, room, user })
