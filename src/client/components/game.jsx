import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import gameCreators from '../redux/actions/game.creators'

import Button from '@material-ui/core/Button'

class Game extends Component {
  constructor(props) {
    super(props)

    this.onClickAnswer = this.onClickAnswer.bind(this)
  }

  onClickAnswer(e) {
    this.props.answer(e.text)
  }

  render() {
    return (
      <div>
        <h2>{this.props.question}</h2>
        <ul>
          {this.props.answers.map(question => (
            <li>
              <Button color="primary" onClick={this.onClickAnswer}>{question}</Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state = {}) => {
  return { loggedIn: state.auth ? state.auth.loggedIn : false }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    create: gameCreators.create
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Game));
