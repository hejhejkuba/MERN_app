import React, {Component} from "react"
import {Link} from "react-router-dom"
import '../css/Menu.css'


export default class Menu extends React.Component 
{
    constructor() 
    {
        super()


    }

    render() 
    {
      return(   
        <div id="menu_bar">
             <div class="row">
                <div class="column">
                  <Link className="ok" to="/Home"><img src="home_icon.png" alt="home_icon"/></Link>
                </div>
                <div class="column">
                  <Link to="/SearchBar"><img src="search_bar_icon.png" alt="search_bar_icon"/></Link> 
                </div>
                <div class="column">
                  <Link to="/Account"><img src="user_icon.png" alt="user_icon"/></Link>
                </div>
              </div> 
				</div>
		)
    }
}