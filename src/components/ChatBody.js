import React, { Component, useState } from "react";
import "./chatBody.css";
import ChatList from "./chatList/ChatList";
import ChatContent from "./chatContent";
import UserProfile from "./userProfile/UserProfile";

  
   const ChatBody = () => {
    const grpId = localStorage.getItem('grpid');
    const [selectedChat, setSelectedChat] = useState(grpId || null)
      return (
        <div className="main__chatbody">
          <ChatList setSelectedChat={setSelectedChat}/>
          <ChatContent selectedChat={selectedChat}/>
          <UserProfile />
          
        </div>
      );
    }

  export default ChatBody