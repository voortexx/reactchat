import React, { Component } from "react";
import "./Form.css";
import Message from "../Message/Message";
import firebase from "firebase/app";
import { Spring } from "react-spring";
export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Anonyme",
      message: "",
      list: []
    };
    this.messageRef = firebase
      .database()
      .ref()
      .child("messages");
    this.listenMessages();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.inviteUser) {
      this.setState({
        userName: nextProps.inviteUser
      });
    }
    if (nextProps.user) {
      this.setState({
        userName: nextProps.user.displayName,
        avatar: nextProps.user.photoURL
      });
    }
  }
  handleChange(event) {
    this.setState({ message: event.target.value });
  }

  handleSend() {
    if (this.state.message) {
      let newItem = {
        userName: this.state.userName,
        message: this.state.message
      };
      if (this.state.avatar) {
        newItem.avatar = this.state.avatar;
      }
      this.messageRef.push(newItem);
      this.setState({ message: "" });
    }
  }
  handleKeyPress(event) {
    if (event.key !== "Enter") return;
    this.handleSend();
  }
  listenMessages() {
    this.messageRef.limitToLast(10).on("value", message => {
      this.setState({
        list: Object.values(message.val())
      });
    });
  }
  render() {
    return (
      <div className="form">
        <Spring
          from={{ opacity: 0, transform: "scale(2)" }}
          to={{ opacity: 1, transform: "scale(1)" }}
          delay={800}
        >
          {props => (
            <div style={props} className="form__message">
              {this.state.list.map((item, index) => (
                <Message key={index} message={item} />
              ))}
            </div>
          )}
        </Spring>
        <Spring
          from={{ opacity: 0, transform: "scale(2)" }}
          to={{ opacity: 1, transform: "scale(1)" }}
          delay={800}
        >
          {props => (
            <div style={props} className="form__row">
              <input
                className="form__input"
                type="text"
                placeholder="Type message"
                value={this.state.message}
                onChange={this.handleChange.bind(this)}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
              <button
                className="form__button"
                onClick={this.handleSend.bind(this)}
              >
                <span style={{ display: "flex" }}>
                  SEND{" "}
                  <i
                    style={{ fontSize: "15px", marginLeft: "10px" }}
                    className="fas fa-location-arrow"
                  />
                </span>
              </button>
            </div>
          )}
        </Spring>
      </div>
    );
  }
}
