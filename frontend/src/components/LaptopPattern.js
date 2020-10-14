import React from "react"

const LaptopPattern = (props)=>{

    return <>
            
            <div className="add-pattern" >   
                    <div><span>Product Name : </span> <input type="text" name="productName" required={true} /></div>
                    <div><span>Manufacturer : </span> <input type="text" name="manufacturer" required={true} /></div>
                    <div><span>Amount : </span><input type="text" name="amount" required={true} /></div>
                    <div><span>Price : </span><input type="text" name="price" required={true} /></div>
                    <div><span>CPU : </span><input type="text" name="cpu" required={true} /></div>
                    <div><span>GPU : </span><input type="text" name="gpu" required={true} /></div>
                    <div><span>RAM : </span><input type="text" name="ram" required={true} /></div>
                    <div><span>Storage : </span><input type="text" name="storage" required={true} /></div>
                    <div><span>Display : </span><input type="text" name="display" required={true} /></div>
                    <div className="image-upload"><span>Cover Image :</span><input type="file" name="mainImage"/></div>
                    <div className="image-upload"><span>Images :</span><input type="file" name="images" multiple/></div>
                    <div className="area"><span>Specifications : </span><textarea type="textArea" name="specifications" required={true} /></div>
                    <div className="area"><span>Description : </span><textarea type="textArea" name="description"/></div>
            </div>       
                    
         
    </>
}

export default LaptopPattern;