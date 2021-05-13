import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import MobileDetails from "../components/productDetails/Mobile"
import Spinner from "../components/Spinner"
import Status from "../components/Status"
import {getProductDetails} from "../Actions/productActions"
const ProductDetails = (props)=>{
     
   const productDetails= useSelector(state => state.productDetails)
   const {loading,error,product} = productDetails
   const dispatch = useDispatch()

     

   useEffect(() => {
      const id = props.match.params.id
      dispatch(getProductDetails(id))
    }, [])
    
     return <>
         {loading? <Spinner /> : 
            error ? <Status isOpen={true} message="Ops... Somthing went wrong when getting product details, please try again"  />:
            product ? <>
               <div className="product-details" >
                    <MobileDetails product={product} />
               </div>
            </> : null }
     </>
}

export default ProductDetails;
