import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import Logo from "./asset/logo.svg.PNG";
import { Link,useNavigate } from 'react-router-dom';


export default function Register() {
  const navigate = useNavigate();
 
  
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/Login');
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

          <label>firstName</label>
          <input {...register("firstName", { required: true })} />
           {errors.firstName?.type === 'required' && "First name is required"}
           </div>
        <div className="form-control">
          <label>LastName</label>
          <input {...register("lastName", { required: true })} />
           {errors.lastName?.type === 'required' && "last name is required"}
        </div>
        <div className="form-control">
          <label>Email</label>
          <input {...register("Email", { required: true })} />
           {errors.Email?.type === 'required' && "Email is required"}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input {...register("Password",{ required: true })} />
           {errors.Email?.type === 'required' && "Password is required"}
        </div>


        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
        <span>
            Already have an account ? <Link to="/Login">Login.</Link>
           
        </span>
      </form>
    </div>
    </>
  );
}