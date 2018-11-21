import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import roomCreators from '../redux/actions/room.creators'

import Button from '@material-ui/core/Button'

class Game extends Component {
  componentWillMount() {
    if(!this.props.loggedIn) this.props.history.push('/login')
  }

  componentDidMount() {
    this.props.getRooms()
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="primary"
          onClick={this.props.createRoom}
        >
          Create Room
        </Button>
        <ul>
          {this.props.rooms.map((room, index) =>
            <li key={room.id}>
              <Button color="primary" onClick={this.props.joinRoom(room.id)}>Room {index + 1}</Button>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state = {}) => {
  return {
    loggedIn: state.auth.loggedIn ? state.auth.loggedIn : false,
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
