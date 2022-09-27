import React, { Component } from "react";
import "./userProfile.css";
import { axiosInstance } from "../../axiosInstance";

import { Table } from "reactstrap";
export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null
    };
    }
    /*const [Us, setAll] = useState([]);
  useEffect(() => {
    {
    axiosInstance.get("/api/userInfo"+localStorage.getItem('userid')).then((response)=>{
      setAll(response.data)

    });
  }  
  },[])  */
  componentDidMount() {
    axiosInstance.get("/api/userInfo/"+localStorage.getItem('userid'))
      .then(res => this.setState({ users: res.data }));
  }
  
  

 

  toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
    
  };
  render() {
    const { users } = this.state;
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
          <i class="fa fa-user" aria-hidden="true"></i>
          </div>
          {users !== null &&
            users.map(user => (
             
                <td>{user.userName}</td>
                
                
                
              
            ))}
        
        

         
        </div>
        <div className="profile__card">
          <div className="card__header" onClick={this.toggleInfo}>
            <h4>Information</h4>
            <i className="fa fa-angle-down"></i>
          </div>
          <div className="card__content">
          
        
        
          {users !== null &&
            users.map(user => (
              <tr key={user.id}>
                <p> UserName : {user.userName}</p>
                <p> FirstName : {user.firstName}</p>
                <p>lastName : {user.lastName}</p>
                <p>Gender: { user.gender}</p>
                
                
              </tr>
            ))}
       
           
          </div>
        </div>
      </div>
    );
  }
}