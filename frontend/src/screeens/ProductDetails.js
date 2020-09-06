import React, { useState, useEffect } from "react"

const ProductDetails = (props)=>{
     
     const [product, setProduct] = useState({})
    useEffect(() => {
        fetch(`/product/${props.match.params.id}`)
           .then(res=> res.json())
           .then(result=> setProduct(result))
           .catch(err=>console.log(err))
        return () => {
           // cleanup
        }
    }, [])


     return <>
               <div className="product-details">
                    <div className="header">{product.productName}</div>
                    <img src="./images/img1.jpg" alt="product" />
                    <div className="product-price">Price : {product.price}</div>
                    <div className="product-specs">Specifications : {product.specifications}</div>
               </div>
    </>
}

export default ProductDetails;
