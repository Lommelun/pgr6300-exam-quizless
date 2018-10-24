import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => (<div><h1>Home</h1></div>)} />
          <Route exact path="/1" />
          <Route exact path="/2" />
          <Route exact path="/3" />
          <Route />
        </Switch>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
