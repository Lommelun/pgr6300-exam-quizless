import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import storeInit from './redux/store'
import { init } from './websocket/connection'

import { App } from './app'

const store = storeInit()
init(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
)
