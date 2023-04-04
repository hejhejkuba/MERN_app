import React, {Component} from "react"
import {Link} from "react-router-dom"
import Menu from "./Menu"
import Login from "./Login"
import Register from "./Register"
import Logout from "./Logout"
import TopBar from "./Header"
import '../css/Account.css'

import axios from "axios"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


export default class Account extends React.Component 
{
    constructor() 
    {
        super()


    }

    render() 
    {
      return(   
		
		<div id="account">  
			<div id="header"><TopBar/></div>

            <div id="content">
				<div id="account-div">
				<div className="table-container">
					
							{
							localStorage.accessLevel > ACCESS_LEVEL_GUEST 
							?<div className="logout">            
								<Logout/>
							</div>
							: <div>
								<td><Link className="blue-button" to={"/Login"}>Login</Link></td>
								<td><Link className="blue-button" to={"/Register"}>Register</Link> </td>
							</div> 
							}
							
							
						
							{
								localStorage.accessLevel >= ACCESS_LEVEL_ADMIN
								?				 
								<div>
									<td><Link className="blue-button" to={"/ResetDatabase"}>Reset</Link></td>
									<td><Link className="blue-button" to={"/AllUsers"}>Users</Link></td>
									
								</div>
								:null
							}
							<br></br>
							<br></br>
							
			<div>
			{
			localStorage.accessLevel > ACCESS_LEVEL_GUEST
			?
			<div>
			<Link className="blue-button" to={"/Purchased/" + localStorage.email}>Purchased</Link>
			</div>
			:
			null
			}
			</div>
						
					 
				</div>
           	 	</div>
			</div>
            <div id="footer"><Menu/></div> 

		  </div>
        )
    }
}