import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const ManageScreen = (props)=>{
    
    const [products,SetProducts] = useState([])

    useEffect(() => {

        fetch("/main")
            .then(res => res.json())
            .then(result => SetProducts(result))
            .catch(err=>console.log(err))

        return () => {
            //cleanup
        }
    }, [])

    function deleteProduct(id){
        fetch(`/delete/${id}`,{method:"DELETE"})
            .then(res => res.json())
            .then(result => window.location.href = result.redirect)
            .catch(err=> console.log(err))
    }

    return <>
    
    <div className="manage-products">
        <div className="manage-products-header"><span>Manage Products</span><Link to="/add/mobile">Add New Product</Link></div>
        <div className="manage-products-body">
            <div className="manage-products-item"><span>Name : </span><span>Amount : </span><span>Price : </span></div>
            {products.map(product=>
                <div key={product._id} className="manage-products-item">
                    <span>{product.productName}</span>
                    <span>{product.amount}</span>
                    <span>${product.price}</span>
                    <Link className="edit-product" to={`/edit/${product._id}`} >Edit Product</Link>
                    <button onClick={()=>{deleteProduct(product._id)}} className="delete-product">Delete Product</button>   
                </div>
                )}
        </div>
        
    </div>
    </>

}
export default ManageScreen;