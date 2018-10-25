import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: "",
      password: "",
      passwordVisible: false
    }

    this.onChange = this.onChange.bind(this)
    this.onClick = this.onClick.bind(this)
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClick(e) {
    e.preventDefault();
  }

  togglePasswordVisibility(e) {
    this.setState(state => ({ passwordVisible: !this.state.passwordVisible }))
  }

  render() {
    return (
      <div>
        <form>
          <TextField
            label="Username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange} />
          <FormControl>
            <InputLabel htmlFor="password-input">Password</InputLabel>
            <Input
              id="password-input"
              name="password"
              type={this.state.passwordVisible ? 'text' : 'password'}
              value={this.state.password}
              onChange={this.onChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={this.togglePasswordVisibility} >
                    {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              } />
          </FormControl>
          <Button color="primary" onClick={this.onClick}>Submit</Button>
        </form>
        <Link to="/register"><Button color="secondary">Register</Button></Link>
      </div>
    )
  }
}

const LoginComponent = connect()(Login)

export default LoginComponent
