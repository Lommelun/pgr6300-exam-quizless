import { createStore, applyMiddleware, combineReducers } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import { emit } from '../websocket/connection'
import authReducer from './reducers/authReducer'
import registerReducer from './reducers/registerReducer'
import roomReducer from './reducers/roomReducer'

const middlewares = [
  logger,
  ReduxThunk.withExtraArgument(emit)
]

const reducers = combineReducers({
  authReducer,
  registerReducer,
  roomReducer
})

export default createStore(reducers, applyMiddleware(...middlewares))
