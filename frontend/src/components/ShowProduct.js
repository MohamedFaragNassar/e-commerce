import React from "react"
import {Link} from "react-router-dom"
const ShowProduct = ({productName,price,id})=>{
    return <>
        <div className="product-card">
            <Link to={`/product/${id}`}><img src="./images/img1.jpg" alt = "product"/></Link>
            <div className = "product-card-body">
                <div className="product-name" >{productName}</div>
                <div className="product-price" >${price}</div>
            </div>
        </div>
    </>
}
export default ShowProduct;