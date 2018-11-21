import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import { emit } from '../websocket/connection'
import { auth } from './reducers/authReducer'
import { register } from './reducers/registerReducer'
import { room } from './reducers/roomReducer'
import { game } from './reducers/gameReducer'

const middlewares = [
  thunk.withExtraArgument(emit),
  logger
]

const reducers = combineReducers({
  auth,
  register,
  room,
  game
})

export default createStore(reducers, applyMiddleware(...middlewares))
