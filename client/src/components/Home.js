import React, {Component} from "react"
import {Link} from "react-router-dom"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

import Menu from "./Menu"
import ProductTable from "./ProductTable"
import axios from "axios"
import TopBar from "./Header"
import '../css/Home.css';

export default class Home extends Component 
{
   constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[]
        }
    }
	componentDidMount() 
    {
        axios.get(`${SERVER_HOST}/products`)
        .then(res => 
        { 
            this.setState({products: res.data})                                         
        })
        .catch(err =>
        {
            // do nothing
        })
    }

    render() 
    {
      return(   
		<div id="home">
            <div id="header"><TopBar/></div>
            <div id="content">
                {
                localStorage.accessLevel > ACCESS_LEVEL_GUEST 
                            ? <div className="WelcomeLogged">Welcome {localStorage.getItem("name")}</div>
                            : <div className = "welcome">Welcome</div>
                }
                
                    <div className="table-container">
                    <ProductTable products={this.state.products}/> 
                
                    {
                                    localStorage.accessLevel >= ACCESS_LEVEL_ADMIN 
                                    ? <div className="add-new-car">
                                        <Link id="add-product-button" to={"/AddProduct"}>Add New Product</Link>
                                    </div>
                                    : null
                    }
                    </div>
               
                </div>
            <div id="footer"><Menu/></div>      
		</div>  
        )
    }
}