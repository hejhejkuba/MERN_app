import React, {Component} from "react"
import {BrowserRouter, Switch, Route, Link} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"


import Home from "./components/Home"
import Menu from "./components/Menu"
import Account from "./components/Account"
import Login from "./components/Login"
import SearchBar from "./components/SearchBar"
import Register from "./components/Register"
import AddProduct from "./components/AddProduct"
import LoggedInRoute from "./components/LoggedInRoute"
import EditProduct from "./components/EditProduct"
import DeleteProduct from "./components/DeleteProduct"
import PayPalMessage from "./components/PayPalMessage"
import AllUsers from "./components/AllUsers"
import BuyProduct from "./components/BuyProduct"
import Purchased from "./components/Purchased"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"

if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

export default class App extends Component 
{
    render() 
    {
        return (
		
		
		<BrowserRouter>
			<Switch>
						<Route exact path="/Home" component={Home} />
						<Route exact path="/Login" component={Login} />
						<Route exact path="/Register" component={Register} />
						<Route exact path="/Account" component={Account} />
						<Route exact path="/SearchBar" component={SearchBar} />
						<Route exact path="/AllUsers" component={AllUsers} />
						<Route exact path="/Purchased/:email" component={Purchased} />
						<Route exact path="/AddProduct" component={AddProduct} />
						<LoggedInRoute exact path="/EditProduct/:id" component={EditProduct} />
						<Route exact path="/BuyProduct/:id" component={BuyProduct} />
						<Route exact path="/SearchBar/:name" component={SearchBar} />
						<LoggedInRoute exact path="/DeleteProduct/:id" component={DeleteProduct} />
						<Route exact path="/PayPalMessage/:messageType/:payPalPaymentID" component={PayPalMessage}/>   
						<Route exact path="/" component={Home} />
						<Route path="*" component={Home}/> 
					

					</Switch>
		</BrowserRouter>
		
			
		
			
        )
    }
}