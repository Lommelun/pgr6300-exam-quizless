import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/root'
import { emit } from '../websocket/connection'
import logger from 'redux-logger'

const middlewares = [
  ReduxThunk.withExtraArgument(emit),
  logger
]

export default createStore(rootReducer, {}, applyMiddleware(...middlewares))
