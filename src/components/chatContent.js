import React, { useState, createRef, useEffect, useRef, useImperativeHandle } from "react";
import { axiosInstance } from "../axiosInstance";

import "./chatContent.css";
import Avatar from "./chatList/Avatar";
import ChatItem from "./ChatItem";
import { socket } from "../UR";


const ChatContent = ({selectedChat}) => {
  const messagesEndRef = useRef(null);
  const messageInput = useRef(null);
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
useEffect(() => {
    socket.off("receive_message").on("receive_message", (data) => {

      setchat((list) => [...list, data]);
    });
  }, [socket]);
  const logout = () => {
    window.localStorage.clear();
    window.location.href = "/";
  }

  const onStateChange = (e) => {
    e.preventDefault();
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
    <p></p>
    scrollToBottom();
    setMSg('');
    messageInput.current.value = '';
  }
  };
  const [Users, setAllUsers] = useState([]);
  useEffect(() => {
    {
    axiosInstance.get("/api/user/"+localStorage.getItem('userid')).then((response)=>{
      setAllUsers(response.data)

    });
  }  
  },[])  
  
  


    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar
                isOnline="active"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTA78Na63ws7B7EAWYgTr9BxhX_Z8oLa1nvOA&usqp=CAU"
              /> 
                {localStorage.getItem('groupName')}
              <p></p>
            </div>
          </div>

          <div className="blocks">
            <div className="settings">
              <button className="btn-nobg" onClick={logout}>
                <i className="fa fa-sign-out"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {chat.map((itm, index) =>
            {
              return (
                <ChatItem
                  animationDelay={index + 2}
                  key={itm.id}
                  user={itm.way == localStorage.getItem('userid') ? 'me' : "other"}
                  msg={itm.message}
                  image={itm.image}
                  time={itm.Date}
                />
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
      
        <div className="content__footer">
          <form noValidate onSubmit={onStateChange} className="message-form">
          <div className="sendNewMessage">
            <input
              type="text"
              placeholder="Type a message here"
              onChange={(e) =>  setMSg(e.target.value)}
              value={msg}
              ref={messageInput}
            />
            <button className="btnSendMsg" id="sendMsgBtn" type="submit">
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
          </form>
        </div>
      </div>
    );
  }

export default ChatContent;