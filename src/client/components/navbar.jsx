import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import userCreators from '../redux/actions/user.creators'

import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

class NavBar extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Quizzless
          </Typography>
          {this.props.loggedIn && (
            <div>
              <Button color="secondary" onClick={this.props.logout}>Logout</Button>
            </div>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

const mapStateToProps = (state = {}) => {
  return { loggedIn: state.auth ? state.auth.loggedIn : false }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ logout: userCreators.logout }, dispatch)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBar));
