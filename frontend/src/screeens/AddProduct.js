import React, { useState, useEffect } from 'react'
import MobilePattern from "../components/MobilePattern"
import LaptopPattern from "../components/LaptopPattern"
import OtherPattern from "../components/OtherPattern"




const AddProduct = (props)=>{
        const [addPattern, setAddPattern] = useState(<MobilePattern/>)
        const [model,SetModel] = useState("mobile")
        
        function handleChoice(patern,model){
            setAddPattern(patern)
            SetModel(model)
        }

       useEffect(() => {
           
           return () => {
               //cleanup
           }
       }, [addPattern,model])
    return (
        <>
            <div className='add-product'>
                <form action = {`/add/${model}`} method = "POST" enctype="multipart/form-data" >
                    <div className="select-cat">
                        <span>Category : </span>
                        <select className="cat-options" name="category">
                            <option onClickCapture={()=>handleChoice(<MobilePattern />,"mobile")} >mobile</option>
                            <option onClickCapture={()=>handleChoice(<LaptopPattern />,"laptop")}>laptops</option>
                            <option onClickCapture={()=>handleChoice(<OtherPattern />,"other")}>pc hardware</option>
                            <option onClickCapture={()=>handleChoice(<OtherPattern />,"other")}>Home devices</option>
                            <option onClickCapture={()=>handleChoice(<OtherPattern />,"other")}>other</option>
                        </select>
                    </div>
                   
                        {addPattern}
                   
                    <div className="add-btn-wrapper"><button className="add-btn">Add Product</button></div>
                </form>
            </div>
        </>
        
    )
    
}


export default AddProduct;