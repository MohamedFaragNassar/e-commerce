import React, { useState, useEffect } from 'react'
import MobilePatern from "../components/MobilePatern"
import LaptopPatern from "../components/LaptopPatern"
import OtherPatern from "../components/OtherPattern"


const AddProduct = (props)=>{
        const [addPatern, setAddPatern] = useState(<MobilePatern/>)
        
       useEffect(() => {
           
           return () => {
               //cleanup
           }
       }, [addPatern])
    return (
        <>
            <div className='add-product'>
                <form action = "/add" method = "POST">
                    <div>
                        <span>Category : </span>
                        <select className="cat-options" name="category">
                            <option onClickCapture={()=>{setAddPatern(<MobilePatern/>)}} >mobile</option>
                            <option onClickCapture={()=>{setAddPatern(<LaptopPatern/>)}}>laptops</option>
                            <option onClickCapture={()=>{setAddPatern(<OtherPatern/>)} }>pc hardware</option>
                            <option onClickCapture={()=>{setAddPatern(<OtherPatern/>)} }>Home devices</option>
                            <option onClickCapture={()=>{setAddPatern(<OtherPatern/>)} }>other</option>
                        </select>
                    </div>
                    {addPatern}
                </form>
            </div>
        </>
        
    )
    
}


export default AddProduct;