import { combineReducers } from 'redux'
import auth from './authReducer'
import room from './roomReducer'
import user from './userReducer'

export default () => { combineReducers(auth, room, user) }
