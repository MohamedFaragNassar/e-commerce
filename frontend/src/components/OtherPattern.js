import React from "react"

const OtherPatern = (props)=>{

    return <>
            
                    
                    <div><span>Product Name : </span> <input type="text" name="productName" required={true} /></div>
                    <div><span>Manufacturer : </span> <input type="text" name="manufacturer" required={true} /></div>
                    <div><span>Amount : </span><input type="text" name="amount" required={true} /></div>
                    <div><span>Price : </span><input type="text" name="price" required={true} /></div>
                    <div><span>Specifications : </span><textarea type="textArea" name="specifications" required={true} /></div>
                    <div><button className="add-btn">Add Product</button></div>
                    
         
    </>
}

export default OtherPatern;