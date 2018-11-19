import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/root'
import { emit } from '../websocket/connection'

const middlewares = [
  ReduxThunk.withExtraArgument(emit)
]

export default () => {
  return createStore(rootReducer, {}, applyMiddleware(...middlewares))
}
