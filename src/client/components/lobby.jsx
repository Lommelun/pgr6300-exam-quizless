import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gameCreators from '../redux/actions/game.creators'

import Button from '@material-ui/core/Button'

class Game extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h2>{this.props.question}</h2>
        <ul>
          {this.props.rooms.map(room => (
            <li>
              <Button color="primary" onClick={() => console.log('hello there', room.id)}>{question}</Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state = {}) => {
  return {
    connecting: state.room ? state.room.connecting : false,
    disconnecting: state.room ? state.room.disconnecting : false,
    rooms: state.room.rooms ? state.room.rooms : []
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    create: gameCreators.create
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
