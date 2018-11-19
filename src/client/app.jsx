import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import Home from './components/home'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route component={() => (<div><h1>404: not found</h1></div>)} />
        </Switch>
      </BrowserRouter>
    )
  }
}
