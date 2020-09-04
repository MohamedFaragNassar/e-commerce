import React from "react"

const ShowProduct = ({productName,price})=>{
    return <>
        <div className="product-card">
            <img src="./images/img1.jpg" alt = "product"/>
            <div className = "product-card-body">
                <div className="product-name" >{productName}</div>
                <div className="product-price" >${price}</div>
            </div>
        </div>
    </>
}
export default ShowProduct;