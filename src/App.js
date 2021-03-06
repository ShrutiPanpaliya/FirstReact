import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import ChatBody from "./components/ChatBody";
import Nav from "./components/nav/Nav";
import Header from "./headfoot/Header";
import UR from "./UR";
import Group from "./components/chatList/Group";
import './App.css';
export default function App() {
  return (
    
    
    <BrowserRouter>
      <Routes>
        
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/ChatBody" element={<ChatBody />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Header" element={<Header />} />
        <Route path ="/UR" element={<UR/>}/>
        <Route path="/Group" element={<Group/>}/>
        <Route path="/" element={<Navigate to="/login" replace />} /> 
      </Routes>
    </BrowserRouter>   
  );
}