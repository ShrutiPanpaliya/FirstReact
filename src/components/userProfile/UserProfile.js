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
            <img src= "https://upload.wikimedia.org/wikipedia/commons/8/81/Lee_Min-ho_-_KCON_2016_%28cropped%29.jpg" />
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
          <Table>
        <thead>
          
          <th>userName</th>
          <th>firstName</th>
          <th>lastName</th>
         
        </thead>
        <tbody>
          {users !== null &&
            users.map(user => (
              <tr key={user.id}>
                <td>{user.userName}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
               
                
                
              </tr>
            ))}
        </tbody>
      </Table>
            Born on 22 June 1987 ,age 35 years .South Korean actor,singer,model,creative director and businessman
          </div>
        </div>
      </div>
    );
  }
}