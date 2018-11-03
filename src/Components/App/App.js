import React, { Component } from "react";
import "./App.css";
import Form from "../Form/Form.js";
import firebase from "firebase/app";
import "firebase/firebase-database";
import "firebase/firebase-auth";
import { Spring } from "react-spring";
import firebaseConfig from "../../config";
firebase.initializeApp(firebaseConfig);
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      inviteUser: ""
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ user });
    });
  }
  handleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }
  handleLogOut() {
    firebase.auth().signOut();
    this.setState({ user: null, inviteUser: "" });
  }
  handleInviteName(event) {
    this.setState({ inviteUser: event.target.value });
  }

  render() {
    return (
      <Spring
        from={{ opacity: 0, transform: "translate3d(0,-100px,0)" }}
        to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
        delay={400}
      >
        {props => (
          <div style={props} className="app">
            <div className="app__header">
              <h1>REACT CHAT</h1>
              {!this.state.user ? (
                <React.Fragment>
                  <h2>Sign in or chat in Invite Mode</h2>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div>
                      <p style={{ marginBottom: "5px" }}>Google Account</p>
                      <button
                        className="app__button"
                        onClick={this.handleSignIn.bind(this)}
                      >
                        Login
                      </button>
                    </div>
                    <div>
                      <p style={{ marginBottom: "5px" }}>Invite Mode</p>
                      <input
                        type="text"
                        value={this.state.inviteUser}
                        onChange={event => this.handleInviteName(event)}
                        placeholder="Your Nickname"
                      />
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <button
                  className="app__button"
                  onClick={this.handleLogOut.bind(this)}
                >
                  Logout
                </button>
              )}
            </div>
            <div className="app__list">
              <Form user={this.state.user} inviteUser={this.state.inviteUser} />
            </div>
          </div>
        )}
      </Spring>
    );
  }
}
export default App;
