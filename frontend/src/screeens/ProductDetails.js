import React, { useState, useEffect } from "react"
import MobileDetails from "../components/productDetails/Mobile"
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
                    <MobileDetails product={product} />
               </div>
    </>
}

export default ProductDetails;
