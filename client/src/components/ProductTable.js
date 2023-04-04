import React, {Component} from "react"
import ProductTableRow from "./ProductTableRow"


export default class ProductTable extends Component 
{
    render() 
    {
        return (
				<table className="table">
                <thead>
                </thead>
                <tbody>
                     {this.props.products.map((product) => <ProductTableRow key={product._id} product={product}/>)}
                </tbody>
            </table>  
					
                   
        )
    }
}