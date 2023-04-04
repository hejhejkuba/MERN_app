import React, {Component} from "react"
import Form from "react-bootstrap/Form"
import {Redirect, Link} from "react-router-dom"
import axios from "axios"

import LinkInClass from "../components/LinkInClass"

import {ACCESS_LEVEL_NORMAL_USER, SERVER_HOST} from "../config/global_constants"

export default class EditProduct extends Component 
{
    constructor(props) 
    {
        super(props)

        this.state = {
            name: ``,
            details: ``,
            year: ``,
            price: ``,
			amount: ``,
            redirectToHome:localStorage.accessLevel < ACCESS_LEVEL_NORMAL_USER,
            wasSubmittedAtLeastOnce:false
        }
    }

    componentDidMount() 
    {      
        this.inputToFocus.focus()
  
        axios.get(`${SERVER_HOST}/products/${this.props.match.params.id}`, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {     
            this.setState({
                name: res.data.name,
                details: res.data.details,
                year: res.data.year,
                price: res.data.price,
				amount: res.data.amount
            })            
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


    handleSubmit = (e) => 
    {
        e.preventDefault()

        const productObject = {
            name: this.state.name,
            details: this.state.details,
            year: this.state.year,
            price: this.state.price,
			amount: this.state.amount
			
        }

        axios.put(`${SERVER_HOST}/products/${this.props.match.params.id}`, productObject, {headers:{"authorization":localStorage.token}})
        .then(res => 
        {             
            this.setState({redirectToHome:true})
        })
        .catch(err => 
        {
            this.setState({wasSubmittedAtLeastOnce: true})
        })
    }


    render() 
    {
        let errorMessage = "";
        if(this.state.wasSubmittedAtLeastOnce)
        {
            errorMessage = <div className="error">Error: All fields must be filled in<br/></div>;
        } 
        
        return (
            <div className="form-container">
    
                {this.state.redirectToHome ? <Redirect to="/Home"/> : null}  
                    
                {errorMessage}
                
                <Form>
                    <Form.Group controlId="name">
                        <Form.Label>Category</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="details">
                        <Form.Label>Details</Form.Label>
                        <Form.Control type="text" name="details" value={this.state.details} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="year">
                        <Form.Label>Year</Form.Label>
                        <Form.Control type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                    </Form.Group>
        
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="text" name="price" value={this.state.price} onChange={this.handleChange} />
                    </Form.Group>
					
					 <Form.Group controlId="amount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control type="text" name="amount" value={this.state.amount} onChange={this.handleChange} />
                    </Form.Group>
  
                    <LinkInClass value="Update" className="blue-button" onClick={this.handleSubmit}/>  
    
                    <Link className="gray-button" to={"/Home"}>Cancel</Link>
                </Form>
            </div>
        )
    }
}