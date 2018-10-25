import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: ""
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <label>
            Username:
            <input type="text" name="username" value={this.state.username} onChange={this.onChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" value={this.state.password} onChange={this.onChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <Link to="/register">Register</Link>
      </div>
    )
  }
}

const LoginComponent = connect()(Login)

export default LoginComponent
