import React, {useEffect, } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductForm from "../components/ProductForm"
import {getProductDetails} from '../Actions/productActions'
import Spinner from '../components/Spinner'
import Status from '../components/Status'
import {useHistory} from "react-router-dom"

const UpdateProduct = (props)=>{
    const id =props.match.params.id
    const dispatch = useDispatch()
    const history = useHistory()
    const {loading,error,product} = useSelector(state => state.productDetails)
    const {updateLoading,updateError,updatedproduct} = useSelector(state => state.productDetails)

    console.log( document.querySelectorAll(".update-form input"))

    useEffect(() => {

       dispatch(getProductDetails(id))

       if(updatedproduct === "success"){
           history.push("/manage")
       }


   }, [])
    
   return <>
         {loading? <Spinner /> : 
            error ? <Status isOpen={true} message="Ops... Somthing went wrong when getting product details, please try again"  />:
            product ? <>
            <div className='add-product'>
                <form className="update-form" >
                    <div className="select-cat">
                        <span>Category : </span><input readOnly={true} name="category" value={product.category} ></input>
                    </div>
                        <ProductForm pattern={product.category} product={product}/>
                </form> 
                {updateLoading ? <Spinner /> : updateError ? <Status isOpen = {true} status="fail"
                                    message="Ops... Somthing went wrong When trying to add new product"/> :null}
                    
            </div>
            </>:null}
         </> 
    }
    
export default UpdateProduct;