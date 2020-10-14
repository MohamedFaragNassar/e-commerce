import React, { useState, useEffect } from 'react'
import MobilePattern from "../components/MobilePattern"
import LaptopPattern from "../components/LaptopPattern"
import OtherPattern from "../components/OtherPattern"




const UpdateProduct = (props)=>{

    const [product,setProduct] = useState({})
    useEffect(() => {
       fetch(`/product/${props.match.params.id}`)
            .then(res => res.json())
            .then(result =>setProduct(result)) 
            .catch(err => console.log(err))

       return () => {
           //cleanup
       }
   }, [])
    
    if(product.category === "mobile"){
       return <>
            <div className='add-product'>
                <form action = {`/edit/${product._id}`} method = "POST">
                    <div>
                        <span>Category : </span><input readOnly={true} name="category" value={product.category} ></input>
                    </div>
                        <MobilePattern product={product}/>
                    <div><button type="submit" className="add-btn" >Update Product</button></div>
                </form> 
            </div>
         </> 
       }else if(product.category === "laptops"){

           return <>
            <div className='add-product'>
                <form action = {`/edit/${product._id}`} method = "POST">
                    <div>
                        <span>Category : </span><input readOnly={true} name="category" value={product.category} ></input>
                    </div>
                        <LaptopPattern product={product}/>
                    <div><button type="submit" className="add-btn">Update Product</button></div>
                </form> 
            </div>
    </>  
       }else{
        return <>
            <div className='add-product'>
                <form action = {`/edit/${product._id}`} method = "POST">
                    <div>
                        <span>Category : </span><input readOnly={true} name="category" value={product.category} ></input>
                    </div>
                        <OtherPattern product={product}/>
                    <div><button type="submit" className="add-btn">Update Product</button></div>
                </form> 
            </div>
         </> 
       }
    
    }
    
export default UpdateProduct;