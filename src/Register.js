import React , { useState }  from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import Logo from "./asset/logo.svg.PNG";
import { Link,useNavigate } from 'react-router-dom';
import {axiosInstance} from './axiosInstance';

export default function Register() {
  const navigate = useNavigate();  
  const { register, handleSubmit, formState: { errors }} = useForm();
  const [user,setUser] = useState({
    userName: '',
    firstName:'',
    lastName:'',
    password:'',
    gender:''
  })

  const onSubmit = (data) => {
    handleSubmit1(data);
    
  };
  const handleChange=(e)=>{
    const value = e.target.value
    setUser({
      ...user,
    });
  };
  const handleSubmit1 = (e) => {
    const userData=
    {
      userName: e.userName,
      firstName:e.firstName,
      lastName:e.lastName,
      password:e.password,
      gender:e.gender
    };
    axiosInstance.post("/api/register",userData).then((response)=>{
      console.log(response.status);
      console.log(response.data);
      navigate('/Login');
    });
  };

  return (
    <>
    <p className="title">Registration Form</p>
    <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>chatBox</h1>
          </div>
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
        <div className="form-control">
          <label>Username</label>
          <input {...register("userName", { required: true })} />
           {errors.username?.type === 'required' && "Username is required"}
        </div>
          <label>FirstName</label>
          <input {...register("firstName", { required: true })} />
           {errors.firstName?.type === 'required' && "First name is required"}
           </div>
        <div className="form-control">
          <label>LastName</label>
          <input {...register("lastName", { required: true })} />
           {errors.lastName?.type === 'required' && "last name is required"}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input type="password" {...register("password",{ required: true })} />
           {errors.userName?.type === 'required' && "password is required"}
        </div>
        <div className="form-control">
          <label>Gender</label>
          <input {...register("gender", { required: true })} />
           {errors.gender?.type === 'required' && "gender is required"}
        </div>

        <div className="form-control">
          <label></label>
          <button type="Submit">Register</button>
        </div>
        <span>
            Already have an account ? <Link to="/Login">Login.</Link>
        </span>
      </form>
    </div>
    </>
  );
}