import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from './Spinner'
import Status from './Status'
import ProductForm from './ProductForm'
import { useHistory } from 'react-router'
import { getProductDetails } from '../Actions/productActions'

const EditProductModal = ({node,id,close}) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {loading,error,product} = useSelector(state => state.productDetails)
    const {updatedproduct} = useSelector(state => state.productDetails)

    
    useEffect(() => {

       dispatch(getProductDetails(id))

       if(updatedproduct === "success"){
           history.push("/manage")
       }


   }, [])

    return<>
        <div className="overlay"></div>
        <div id="editproductmodal" className="add-product-modal" ref={node}>
            <div className="modal-header">Updating Product</div>
            {loading? <Spinner /> : 
            error ? <Status isOpen={true} message="Ops... Somthing went wrong when getting product details, please try again"  />:
            product ? <>
            <div className='add-product'>
                <ProductForm pattern={product.category} product={product} close={close}/>
            </div>
            </>:null}
            
        </div>
    </>
}

export default EditProductModal
