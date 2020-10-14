import React from "react"

const MobilePattern = ({product})=>{
    const location = window.location.pathname
    console.log(product)
    if(location.includes("edit")){

        return <>
          <div><span>Product Name : </span> <input type="text" name="productName" required={true} defaultValue={product.productName} /></div>
          <div><span>Manufacturer : </span> <input type="text" name="manufacturer" required={true} defaultValue={product.manufacturer} /></div>
          <div><span>Amount : </span><input type="text" name="amount" required={true} defaultValue={product.amount}  /></div>
          <div><span>Price : </span><input type="text" name="price" required={true} defaultValue={product.price} /></div>
          <div><span>CPU : </span><input type="text" name="cpu" required={true} defaultValue={product.cpu} /></div>
          <div><span>RAM : </span><input type="text" name="ram" required={true} defaultValue={product.ram} /></div>
          <div><span>Storage : </span><input type="text" name="storage" required={true} defaultValue={product.storage}  /></div>
          <div><span>Display : </span><input type="text" name="display" required={true} defaultValue={product.display} /></div>
          <div><span>Specifications : </span><textarea type="textArea" name="specifications" defaultValue={product.specifications} /></div>
          <div><span>Specifications : </span><textarea type="textArea" name="discription" defaultValue={product.discription} /></div>
    </>  
    }else{
      
        return <>
        <div className="add-pattern" >
          <div><span>Product Name : </span> <input type="text" name="productName" required={true} /></div>
          <div><span>Manufacturer : </span> <input type="text" name="manufacturer" required={true}  /></div>
          <div><span>Amount : </span><input type="text" name="amount" required={true}  /></div>
          <div><span>Price : </span><input type="text" name="price" required={true}/></div>
          <div><span>CPU : </span><input type="text" name="cpu" required={true}  /></div>
          <div><span>RAM : </span><input type="text" name="ram" required={true}  /></div>
          <div><span>Storage : </span><input type="text" name="storage" required={true}  /></div>
          <div><span>Display : </span><input type="text" name="display" required={true} /></div>
          <div className="image-upload"><span>Cover Image :</span><input type="file" name="mainImage"/></div>
          <div className="image-upload"><span>Images :</span><input type="file" name="images" multiple/></div>
          <div className="area"><span>Specifications : </span><textarea type="textArea" name="specifications" /></div>
          <div className="area"><span>Description : </span><textarea type="textArea" name="discription"/></div>
        </div>
      </>
    }
  
}

export default MobilePattern;