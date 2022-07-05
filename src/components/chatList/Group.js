
import React from "react";
import {useNavigate} from 'react-router-dom';
import { axiosInstance } from "../../axiosInstance";
import { useForm } from "react-hook-form";

function Group() {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm();
     
    const ChatBodyto = () => {
     
      navigate('/ChatBody');
    };
    const onSubmit = (data) => {
        handleSubmit1(data);
      };
      const handleSubmit1 = (e) => 
      {
        const userData=
        {
            grpName: e.grpName
        };
        axiosInstance.post('/api/groupDetails',userData).then((response)=>{
        if(response?.data){
          console.log(response.status);
          localStorage.setItem('grpid', response.data.id);
          navigate('/ChatBody');
          }
        });
      }
    

  return (
    <div className="App">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <label>Group Name</label>
          <input{...register("grpName",{require: true})}/>
          <button type="Submit">join  conversation</button>
        </div>
      </form>
    </div>
  );
}

export default Group;