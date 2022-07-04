import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";
import Logo from "./asset/logo.svg.PNG";
import { Link ,useNavigate} from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
 
  
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    console.log(data);
    navigate('/Home');
  };

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

          <label>Name</label>
          <input {...register("Name", { required: true })} />
           {errors.firstName?.type === 'required' && " name is required"}
           </div>
        
        <div className="form-control">
          <label>Password</label>
          <input {...register("Password", { required: true })} />
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