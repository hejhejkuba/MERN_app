import React, {Component} from "react"
import {Link} from "react-router-dom"
import TopBar from "./Header"

import Menu from "./Menu"
import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"


import axios from "axios"

export default class Purchased extends Component 
{
    constructor(props) 
	{
	    super(props)
        
        this.state = {
            transactions:[],
			email:"",
        }
    }


    
	componentDidMount ()  
    {
		this.state.email = localStorage.email
        axios.get(`${SERVER_HOST}/sales/${this.state.email}`)
        .then(res => 
        { 
            this.setState({transactions: res.data})                                         
        })
        .catch(err =>
        {
            // do nothing
        })
    }

    render() 
    {
      return(   
			  <div id="user1_div">
                <div id="header"><TopBar/></div>
                <div id="content">
                <div className="WelcomeLogged">Transactions</div>
                <div className="table-container">
                    <table>
					<tr><td>Transaction ID</td><td>Email</td><td>Price</td><td></td><td></td></tr>
					                    {this.state.transactions.map(transaction => (
                        <tr key={transaction._id} id="user_table"><td>{transaction.paypalPaymentID}</td><td>{transaction.customerEmail}</td><td>{transaction.price} USD</td><td></td><td><button className="gray-button">Refund</button></td></tr>
                    ))}

                    </table>
                    <div className="add-new-car">
                        <Link className="gray-button" to={"/Account"}>Cancel</Link>
                    </div>
                    
                    </div>
               
                </div>
            <div id="footer"><Menu/></div>
            </div>
        )
    }
}