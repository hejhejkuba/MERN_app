import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import Menu from "./Menu"
import axios from "axios"
import TopBar from "./Header"
import '../css/AllUsers.css';


export default class AllUsers extends Component 
{
   constructor(props) 
    {
        super(props)
        
        this.state = {
            users:[]
        }
    }
    componentDidMount() {
        axios.get(`${SERVER_HOST}/users`)
            .then(res => {
                this.setState({ users: res.data });
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() 
    {
      return(
	  <div id="user_div">
        <div id="header"><TopBar/></div>
            <div id="content">
            <div className="WelcomeLogged">Users List</div>
            <div className="table-container">
                <table>
                        {this.state.users.map(user => (
                            <tr key={user._id} id="user_table">
                                <td>
                                    <div className="table-div">
                                        {user._id}   
                                    </div>
                                </td>
                                <td>
                                    <div className="table-div">
                                        {user.name}  
                                    </div>
                                </td>
                                <td>
                                    <div className="table-div">
                                        {user.email}   
                                    </div>
                                </td>
                                <td>
                                    <div className="table-div">
                                        <button className="gray-button">Delete</button>
                                    </div>
                                </td>
                                </tr>
                        ))}
                </table>
                <div className="add-new-car">
                        <Link className="blue-button" to={"/Account"}>Cancel</Link>     
                </div>       
            </div>
                
                
				
                </div>
            <div id="footer"><Menu/></div>  
               
                
            </div>
	  )
	}
}