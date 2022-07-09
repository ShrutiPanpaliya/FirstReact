import React,{useEffect,useState} from "react";
import {useNavigate} from 'react-router-dom';
import { axiosInstance } from "../../axiosInstance";
import { useForm } from "react-hook-form";
import Select from "react-select";

function Group() {
    const navigate = useNavigate();
    const { register, handleSubmit} = useForm();
    const [Users, setAllUsers] = useState([]);
    
    useEffect(() => {
      {
        if (localStorage.getItem('userid')) 
        {
          axiosInstance.get("/api/getuser/" + localStorage.getItem('userid')).then((response)=>{
            setAllUsers(response.data)
          });
        } else {
          navigate("/login")
        }  
      }
    },[])

    const techCompanies = [
      { label: "Apple", value: 1 },
      { label: "Facebook", value: 2 },
      { label: "Netflix", value: 3 },
      { label: "Tesla", value: 4 },
      { label: "Amazon", value: 5 },
      { label: "Alphabet", value: 6 },
    ];
    const ChatBodyto = () => {
     
      navigate('/ChatBody');
    };
      const onSubmit = (e) => 
      {
        const userData=
        {
            grpName: e.grpName,
            users: e.users
        };
        axiosInstance.post('/api/groupDetails/'+localStorage.userid,userData).then((response)=>{
        if(response?.data){
          console.log(response.status);
          localStorage.setItem('grpid', response.data);
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
          <input name="grpName" {...register("grpName",{require: true})}/>
          <div>
            <select multiple name="users" {...register("users")}>
               {Users.map((item,i) => {
            return(
            <option key={i} value={item.id}>{item.userName}</option>
            );
          })}
          
          </select>

          </div>
          <button type="Submit" >join  conversation</button>
        </div>
      </form>
    </div>
  );
}

export default Group;