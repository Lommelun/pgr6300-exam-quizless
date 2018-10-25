import { createStore, applyMiddleware } from 'redux'
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import rootReducer from '../reducers/root'

const epicMiddleware = createEpicMiddleware()

const middlewares = [
  epicMiddleware,
  window.__REDUX_DEVTOOLS_EXTENSION__
]

export default () => {
  const store = createStore(rootReducer, applyMiddleware(...middlewares))
  epicMiddleware.run(combineEpics())
  return store
}
