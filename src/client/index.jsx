import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

class App extends Component {
  notFound() {
    return (<div><h1>404: not found</h1></div>)
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => (<div><h1>World</h1></div>)} />
            <Route exact path="/1" />
            <Route exact path="/2" />
            <Route exact path="/3" />
            <Route component={this.notFound} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
