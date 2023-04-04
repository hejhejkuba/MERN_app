import React, {Component} from "react"
import {Link} from "react-router-dom"
import Menu from "./Menu"
import ProductTable from "./ProductTable"
import axios from "axios"
import TopBar from "./Header"
import '../css/SearchBar.css'


import LinkInClass from "../components/LinkInClass"
import {SERVER_HOST} from "../config/global_constants"


export default class Search_Bar extends Component 
{
   constructor(props) 
    {
        super(props)
        
        this.state = {
            products:[],
			name:''

        }
    }
	
	handleSubmit = (e) =>  
    {
        axios.get(`${SERVER_HOST}/products/${this.state.name}`)
        .then(res => 
        { 
            this.setState({products: res.data})                                         
        })
        .catch(err =>
        {
            // do nothing
        })
    }

	  handleChange = (e) => 
    {
        this.setState({[e.target.name]: e.target.value})
		
    }
    render() 
    {
      return(   
		
		<div id="search_bar">  
            <div id="header"><TopBar/></div>
            <div id="content">
                <div id="search-input-div">
                <input id="search-input"
                        type = "name" 
                        name = "name" 
                        placeholder = "Category"
                        autoComplete="name"
                        value={this.state.name} 
                        onChange={this.handleChange}
                    />
                
                <Link value="Search" id="blue-button-input" onClick={this.handleSubmit} to={"/SearchBar/"+ this.state.name}>Search</Link> 
                </div >
                <div className="table-container">
                <ProductTable products={this.state.products}/>
                </div>.
                </div>
            <div id="footer"><Menu/></div>  
		</div>	
		  
        )
    }
}