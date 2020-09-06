import React from "react"

const MobilePatern = (props)=>{

    return <>
        
                    
                    <div><span>Product Name : </span> <input type="text" name="productName" required={true} /></div>
                    <div><span>Manufacturer : </span> <input type="text" name="manufacturer" required={true} /></div>
                    <div><span>Amount : </span><input type="text" name="amount" required={true} /></div>
                    <div><span>Price : </span><input type="text" name="price" required={true} /></div>
                    <div><span>CPU : </span><input type="text" name="cpu" required={true} /></div>
                    <div><span>RAM : </span><input type="text" name="ram" required={true} /></div>
                    <div><span>Storage : </span><input type="text" name="storage" required={true} /></div>
                    <div><span>Display : </span><input type="text" name="display" required={true} /></div>
                    <div><span>Specifications : </span><textarea type="textArea" name="specifications" /></div>
                    <div><button className="add-btn">Add Product</button></div>
                    
             
    </>
}

export default MobilePatern;