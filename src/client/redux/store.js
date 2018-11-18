import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import rootReducer from '../reducers/root'
import { emit } from '../websocket/connection'

const epicMiddleware = createEpicMiddleware()

const middlewares = [
  ReduxThunk.withExtraArgument(emit)
]

export default () => {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  epicMiddleware.run(combineEpics())
  return store
}
