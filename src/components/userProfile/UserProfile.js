import React, { Component } from "react";
import "./userProfile.css";

export default class UserProfile extends Component {
  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };
  render() {
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img src= "https://upload.wikimedia.org/wikipedia/commons/8/81/Lee_Min-ho_-_KCON_2016_%28cropped%29.jpg" />
          </div>
          <h4>Lee Min Ho</h4>
          <p>CEO ,Actor and Singer</p>
        </div>
        <div className="profile__card">
          <div className="card__header" onClick={this.toggleInfo}>
            <h4>Information</h4>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="card__content">
            Born on 22 June 1987 ,age 35 years .South Korean actor,singer,model,creative director and businessman
          </div>
        </div>
      </div>
    );
  }
}