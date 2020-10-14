import React from "react"
import {Link} from "react-router-dom"
const ShowProduct = ({productName,price,id,mainImage})=>{
    console.log(mainImage)
    return <>
        <div className="product-card">
            <Link to={`/product/${id}`}><img src={"./"+mainImage} alt = "product"/></Link>
            <button><img src="./assets/cart.svg" /><span>Add To Cart</span></button>
            <div className = "product-card-body">
                <div className="product-name" >{productName}</div>
                <div className="price-review">
                    <div className="product-price" >${price}</div>
                    <div className="review">Review</div>
                </div>
                
            </div>
        </div>
    </>
}
export default ShowProduct;