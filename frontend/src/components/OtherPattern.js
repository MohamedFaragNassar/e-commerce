import React from "react"

const OtherPatern = (props)=>{

    return <>
        <div className="add-pattern" >
            <div><span>Product Name : </span> <input type="text" name="productName" required={true} /></div>
            <div><span>Manufacturer : </span> <input type="text" name="manufacturer" required={true} /></div>
            <div><span>Amount : </span><input type="text" name="amount" required={true} /></div>
            <div><span>Price : </span><input type="text" name="price" required={true} /></div>
            <div className="image-upload"><span>Cover Image :</span><input type="file" name="mainImage"/></div>
            <div className="image-upload"><span>Images :</span><input type="file" name="images" multiple/></div>
            <div className="area"><span>Specifications : </span><textarea type="textArea" name="specifications" /></div>
            <div className="area"><span>Description : </span><textarea type="textArea" name="discription"/></div>
        </div>  
    </>
}

export default OtherPatern;