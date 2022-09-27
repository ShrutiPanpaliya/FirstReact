import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../axiosInstance";
import { socket } from "../../UR";
import "./chatList.css";

import ChatListItems from "./ChatListItems";
const ChatList = ({setSelectedChat}) => {
  const [allChatUsers, setAllChatUsers] = useState([]);
  const navigate = useNavigate();
  const Groupto = () =>{ 
    
    navigate('../Group');
  }
  useEffect(() => {
    if (localStorage.getItem('userid')) {
    axiosInstance.get("/api/getMessagelist/" + localStorage.getItem('userid')).then((response)=>{
      setAllChatUsers(response.data)

    });
  } else {
    navigate('/Login');
  }
  },[])
    return (
      <div className="main__chatlist">
        <button className="btn" onClick={Groupto}>
          <i className="fa fa-plus"></i>
          conversation
        </button>
        <div className="chatlist__heading">
          <h2>Chats</h2>
          <button className="btn-nobg">
            <i className="fa fa-ellipsis-h"></i>
          </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <input type="text" placeholder="Search Here" required />
            <button className="search-btn">
              <i className="fa fa-search"></i>
            </button>
          </div>
        </div>
        <div className="chatlist__items">
          {allChatUsers.map((item, index) => {
            return (
              <ChatListItems
              {...item}
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.profilePic}
                selectChat={() => {
                  setSelectedChat(item.id)
                  localStorage.setItem('groupName', item.name);
                  localStorage.setItem('key',item.id);
                  socket.emit("join_room", item.id);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

export default ChatList