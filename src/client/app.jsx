import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => (<div><h1>Home</h1></div>)} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" />
          <Route exact path="/3" />
          <Route component={() => (<div><h1>404: not found</h1></div>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App