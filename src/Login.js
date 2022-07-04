import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import Logo from "./asset/logo.svg.PNG";
import { Link ,useNavigate} from 'react-router-dom';
import { axiosInstance } from "./axiosInstance";


export default function Login() {
  const navigate = useNavigate();
 
  
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [user,setUser] = useState({
    userName: '',
    password: ''
  })
  const onSubmit = (data) => {
    handleSubmit1(data);
  };
  const handlechange=(e)=>
  {
    const value = e.target.value
    setUser({
      ...user,
    })
  }
  const handleSubmit1 = (e) => 
  {
    const userData=
    {
      userName: e.userName,
      password:e.password,
    };
    axiosInstance.post("/api/login",userData).then((response)=>{
      if (response?.data?.id) {
      console.log(response.status);
      localStorage.setItem('userid', response.data.id);
      navigate('/ChatBody');
      }
    });
  }
  return (
    
    <>
    <p className="title">Login Form</p>
    <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatBox</h1>
          </div>
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">

          <label>UserName</label>
          <input {...register("userName", { required: true })} />
           {errors.firstName?.type === 'required' && " userName is required"}
           </div>
        
        <div className="form-control">
          <label>Password</label>
          <input type="password" {...register("password",{ required: true })} />
           {errors.Email?.type === 'required' && "Password is required"}
        </div>

        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
        <span>
         Don't have  account ? <Link to="/Register">Register.</Link>
           
        </span>
      </form>
    </div>
    </>
  );
}