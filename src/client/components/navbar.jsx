import React from "react";
import { Link, withRouter } from "react-router-dom";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  async logout() {
    let response

    try {
      response = await fetch('/api/auth/logout', { method: "post" })
    } catch (err) {
      alert("Failed to connect to server: " + err)
      return
    }

    if (response.status !== 204) {
      alert("Error when connecting to server: status code " + response.status)
      return
    }

    this.props.updateLoggedInUserId(null)
    this.props.history.push("/")
  }

  renderLoggedIn(userId) {
    return (
      <div className="msgDiv">
        <h3 className="notLoggedInMsg">
          Welcome {userId}
          !!!
        </h3>

        <div className="btn btnPartHeader" onClick={this.logout}>
          Logout
        </div>
      </div>
    );
  }

  renderNotLoggedIn() {
    return (
      <div className="msgDiv">
        <div className="notLoggedInMsg">You are not logged in</div>
        <div className="btnPartHeader">
          <Link className="btn" to="/login">
            LogIn
          </Link>
          <Link className="btn" to="/signup">
            SignUp
          </Link>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={"navBar"}>
        <Link className="btn home" to={"/"}>
          Home
        </Link>
        {
          (userId === null || userId === undefined)
            ? this.renderNotLoggedIn()
            : this.renderLoggedIn()
        }
      </div>
    );
  }
}

export default withRouter(NavBar);
