import React, { Component } from "react";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <i className="fa fa-user" />
        </div>
        <span className={`isOnline ${this.props.isOnline}`}></span>
      </div>
    );
  }
}