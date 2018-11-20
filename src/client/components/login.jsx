import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userCreators from '../redux/actions/user.creators'

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
      passwordVisible: false,
      errorMessage: null
    }

    this.onChange = this.onChange.bind(this)
    this.onClickRegister = this.onClickRegister.bind(this)
    this.onClickLogin = this.onClickLogin.bind(this)
    this.togglePasswordVisibility = this.togglePasswordVisibility.bind(this)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  onClickLogin(_e) {
    this.props.login(this.state.username, this.state.password)
  }

  onClickRegister(_e) {
    this.props.register(this.state.username, this.state.password)
  }

  togglePasswordVisibility(_e) {
    this.setState(state => ({ passwordVisible: !state.passwordVisible }))
  }

  componentDidUpdate() {
    if (this.props.loggedIn) {
      this.props.history.push('/')
    }
  }

  componentDidMount() {
    if (this.props.loggedIn) {
      this.props.history.push('/')
    }
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
                    {this.state.passwordVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              } />
          </FormControl>
          <Button color="primary" onClick={this.onClickLogin}>Login</Button>
          <Button color="secondary" onClick={this.onClickRegister}>Register</Button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state = []) => {
  return {
    loggedIn: state.auth ? state.auth.loggedIn : false
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    login: userCreators.login,
    register: userCreators.register
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))
