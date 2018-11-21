import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import roomCreators from '../redux/actions/room.creators'

import Button from '@material-ui/core/Button'

class Game extends Component {
  constructor(props) {
    super(props)

    this.props.getRooms()
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
    createRoom: roomCreators.create,
    removeRoom: roomCreators.remove,
    joinRoom: roomCreators.join,
    leaveRoom: roomCreators.leave,
    getRooms: roomCreators.get
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
