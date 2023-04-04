import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

import BuyProduct from "./BuyProduct"
import EditProduct from "./EditProduct"
import DeleteProduct from "./DeleteProduct"

export default class ProductTableRow extends Component 
{    
    componentDidMount() 
    {
        this.props.product.photos.map(photo => 
        {
            return axios.get(`${SERVER_HOST}/products/photo/${photo.filename}`)
            .then(res => 
            {         
                document.getElementById(photo._id).src = `data:;base64,${res.data.image}`                                                         
            })
            .catch(err =>
            {
                // do nothing
            })
        })
    }
    
    
    render() 
    {
        let soldOrForSale = true
            if(this.props.product.sold === false)
            {
                soldOrForSale = <BuyProduct productID={this.props.product._id} price={this.props.product.price} />
            }
            else
            {
                soldOrForSale = "SOLD"
            }

        
        
        return (
			<tr>
                <td>
                    <div className="table-div">
                        {this.props.product.name}    
                    </div>
                </td>
                <td>
                    <div className="table-div">
                        {this.props.product.details}
                    </div>
                </td>
                <td>
                    <div className="table-div">
                        {this.props.product.year}         
                    </div>
                </td>
                <td>
                    <div className="table-div">
                        {this.props.product.price} USD     
                    </div>
                </td>
                <td className="carPhotos">
                    <div className="table-div-img">
                        {this.props.product.photos.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                    </div> 
                </td>  
				<td>
                    <div className="table-div">
                        {localStorage.accessLevel  >= ACCESS_LEVEL_ADMIN ? <Link className="blue-button" to={"/EditProduct/" + this.props.product._id}>Edit</Link> : null}   
                    </div>
				</td>
				<td>
                    <div className="table-div">
                        {localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Link className="gray-button" to={"/DeleteProduct/" + this.props.product._id}>Delete</Link> : null}      
                    </div>
				</td>
				<td>
                    <div className="table-div">
                        {soldOrForSale}      
                    </div> 
				</td>

           </tr> 
        )
    }
}