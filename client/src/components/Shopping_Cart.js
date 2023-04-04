import React, {useState} from "react"
import Menu from "./Menu"
export default class Shopping_Cart extends React.Component 
{
    constructor() 
    {
        super()


    }

    render() 
    {
      return(   
		
		<div id="shopping_cart">  
			<Menu/>
		</div>	
		  
        )
    }
}