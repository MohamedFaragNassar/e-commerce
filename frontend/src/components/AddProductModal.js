import React from 'react'
import ProductForm from "../components/ProductForm"


const AddProductModal = ({isOpen,close,node}) => {

   if(!isOpen){
       return null
   }
    return<>
        <div className="overlay"></div>
        <div className="add-product-modal" ref={node}>
            <div className="modal-header">Adding New Product</div>
            <div className="add-product">
                <ProductForm close={close} />
            </div>
            
        </div>
    </>
}

export default AddProductModal
