import React, { Component } from "react";
import "./Message.css";
import { Spring } from "react-spring";
export default class Message extends Component {
  render() {
    return (
      <Spring
        from={{ opacity: 0, transform: "translate3d(0,-100px,0)" }}
        to={{ opacity: 1, transform: "translate3d(0,0,0)" }}
      >
        {props => (
          <div style={props} className="message">
            <span className="avatar">
              {this.props.message.avatar ? (
                <img src={this.props.message.avatar} alt="avatar" />
              ) : (
                <i className="fas fa-user" />
              )}
            </span>
            <div>
              <span className="message__author">
                {this.props.message.userName}
              </span>
              <p>{this.props.message.message}</p>
            </div>
          </div>
        )}
      </Spring>
    );
  }
}
