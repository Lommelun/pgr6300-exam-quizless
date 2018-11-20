import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './components/login'
import NavBar from './components/navbar'
import Home from './components/home'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <NavBar />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route component={() => (<div><h1>404: not found</h1></div>)} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
