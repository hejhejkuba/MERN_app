import React, {Component} from "react"
import '../css/Header.css'

export default class Header extends React.Component 
{
    constructor() 
    {
        super()


    }

    render() 
    {
      return(   
        <div id="TopBar">
						<img src="xcom_icon.png" alt="xcom_icon"/>
            
              {
                localStorage.profilePhoto !== "null" 
                ? <img id="profilePhoto" src={`data:;base64,${localStorage.profilePhoto}`} alt=""/>
                : null
              }    
            
              
				</div>
		)
    }
}