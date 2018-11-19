import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => <div><h1>Home page</h1></div>} />
          <Route exact path="/login" component={Login} />
          <Route component={() => (<div><h1>404: not found</h1></div>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}
