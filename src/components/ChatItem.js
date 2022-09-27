import React, { Component } from "react";
import Avatar from "./chatList/Avatar";
import "../UR.css";
import { axiosInstance } from "../axiosInstance";
export default class ChatItem extends Component {
  constructor(props) {
    
  
    super(props);
    var today = new Date(),

    time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();

    /*this.state={
      messageID:null

     };*/
    

    this.state = {

      currentTime: time
      

    }
  }
 /* componentDidMount() {
    axiosInstance.get("/api/getMessageUser/"+localStorage.getItem('key'))
      .then(res => this.setState({ messageID: res.data }));
       {messageID !== null &&
            messageID.map(user => (
             
                <td>{user.userName}</td>
                
                
                
              
            ))}
  }*/
  
  render() {
    /*const { messageID } = this.state;*/
    return (
      
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.user ? this.props.user : ""}`}
      >
         <div className="chat__item__content">
          
          <div className="chat__msg">{this.props.msg}</div>
          
          

          <div className="chat__meta">
          
          <span> { this.state.currentTime }</span>
           
            
          </div>
        </div>
        <Avatar isOnline="active" image={this.props.image} />
        <p >{this.props.user}</p>
        <div className="message-meta">
       
         
          
                    <p >{this.props.name}</p>
                  </div>
      </div>
    );
  }
}