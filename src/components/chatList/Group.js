import React from "react";
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
      axiosInstance.get("api/user").then((response)=>{
        setAllUsers(response.data)
  
      });
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
    const onSubmit = (data) => {
        handleSubmit1(data);
      };
      const handleSubmit1 = (e) => 
      {
        const userData=
        {
            grpName: e.grpName
        };
        axiosInstance.post('/api/groupDetails/'+localStorage.userid,userData).then((response)=>{
        if(response?.data){
          console.log(response.status);
          localStorage.setItem('grpid', response.data.id);
          navigate('/ChatBody');
          }
        });
      }
      
    

  return (
    <div className="App">
      {Users.map((item, index) => {
            return (
              <ChatListItems
                name={item.name}
                key={item.id}
                animationDelay={index + 1}
                active={item.active ? "active" : ""}
                isOnline={item.isOnline ? "active" : ""}
                image={item.profilePic}
                />
            );
          })}
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <label>Group Name</label>
          <input{...register("grpName",{require: true})}/>
          <div>
          <Select options={item.Users} isMulti/>
          </div>
          <button type="Submit" >join  conversation</button>
        </div>
      </form>
    </div>
  );
}

export default Group;