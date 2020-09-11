import React, { useState, useEffect } from 'react'
import MobilePatern from "../components/MobilePatern"
import LaptopPatern from "../components/LaptopPatern"
import OtherPatern from "../components/OtherPattern"




const AddProduct = (props)=>{
        const [addPatern, setAddPatern] = useState(<MobilePatern/>)
        const [model,SetModel] = useState("mobile")
        
        function handleChoice(patern,model){
            setAddPatern(patern)
            SetModel(model)
        }

       useEffect(() => {
           
           return () => {
               //cleanup
           }
       }, [addPatern,model])
    return (
        <>
            <div className='add-product'>
                <form action = {`/add/${model}`} method = "POST">
                    <div>
                        <span>Category : </span>
                        <select className="cat-options" name="category">
                            <option onClickCapture={()=>handleChoice(<MobilePatern/>,"mobile")} >mobile</option>
                            <option onClickCapture={()=>handleChoice(<LaptopPatern/>,"laptop")}>laptops</option>
                            <option onClickCapture={()=>handleChoice(<OtherPatern/>,"other")}>pc hardware</option>
                            <option onClickCapture={()=>handleChoice(<OtherPatern/>,"other")}>Home devices</option>
                            <option onClickCapture={()=>handleChoice(<OtherPatern/>,"other")}>other</option>
                        </select>
                    </div>
                    {addPatern}
                </form>
            </div>
        </>
        
    )
    
}


export default AddProduct;