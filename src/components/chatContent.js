import React, { Component, useState, createRef, useEffect, useRef } from "react";
import { axiosInstance } from "../axiosInstance";

import "./chatContent.css";
import Avatar from "./chatList/Avatar";
import ChatItem from "./ChatItem";
import { socket } from "../UR";
/*const chatItms = [
  {
    key: 1,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "Hii,Hope everything is well",
  },
  {
    key: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "yup,I am fine.",
  },
  {
    key: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "What about you?",
  },
  {
    key: 4,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "Awesome these days.",
  },
  {
    key: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "Finally. What's the plan?",
  },
  {
    key: 6,
    image:
      "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
    type: "",
    msg: "what plan mate?",
  },
  {
    key: 7,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU",
    type: "other",
    msg: "I'm taliking about the tutorial",
  },
];*/

const ChatContent = ({selectedChat}) => {
  const messagesEndRef = useRef(null);
  const [msg, setMSg] = useState('');
  const [chat, setchat] = useState([]);
  
  const scrollToBottom = () => {
    setTimeout(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  useEffect(() => {
    if (selectedChat) {
      axiosInstance.get("/api/getMessage/" + selectedChat).then((response)=>{
        setchat(response.data)
        scrollToBottom();
      });
    }
  }, [selectedChat])

  // componentDidMount() {
  //   window.addEventListener("keydown", (e) => {
  //     if (e.keyCode == 13) {
  //       if (this.state.msg != "") {
  //         this.chatItms.push({
  //           key: 1,
  //           type: "",
  //           msg: this.state.msg,
  //           image:
  //             "https://pbs.twimg.com/profile_images/1116431270697766912/-NfnQHvh_400x400.jpg",
  //         });
  //         this.setState({ chat: [...this.chatItms] });
  //         this.scrollToBottom();
  //         this.setState({ msg: "" });
  //       }
  //     }
  //   });
  //   this.scrollToBottom();
  // }
  const onStateChange = () => {
    if (msg) {
    const messageData = {
      room: selectedChat,
      author: localStorage.getItem('userid'),
      message: msg,
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    
    socket.emit("send_message", messageData);
    const data = [...chat];
    data.push({
      messageGroupId: selectedChat,
      message: msg,
      way: messageData.author,
      createdAt: new Date()
    })
    setchat(data);
    scrollToBottom();
    setMSg('');
  }
    
    /*axiosInstance.fetch("/api/message",setMSg).then((response)=>{
      console.log(response.status);
      console.log(response.data.token);
      
    });*/
  };
  
  
  


    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              />
              <p>Tim Hover</p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {chat.map((itm, index) => {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.id}
                  user={itm.way == localStorage.getItem('userid') ? 'me' : itm.type}
                  msg={itm.message}
                  image={itm.image}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={(e) =>  setMSg(e.target.value)}
            />
            <button className="btnSendMsg" id="sendMsgBtn" onClick={onStateChange}>
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }

export default ChatContent;