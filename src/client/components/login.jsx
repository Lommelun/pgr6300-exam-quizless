import React, { Component } from 'react'

export default class login extends Component {
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
    // TODO
  }

  render() {   
    return (
      <div>
        <form>
          <label name="Username" />
          <input type="text" value={} name="username-input" placeholder="Username" />
          <label name="Password" />
          <input type="password" value={} name="password-input" placeholder="Password" />
          <button type="submit" onSubmit={this.onSubmit} />
        </form>
      </div>
    )
  }
}
