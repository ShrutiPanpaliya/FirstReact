import React from "react";
import { useForm } from "react-hook-form";
import "./styles.css";

export default function App() {
  
 
  
  const { register, handleSubmit, formState: { errors }} = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
    <p className="title">Registration Form</p>
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
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </>
  );
}