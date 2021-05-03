import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import ProductForm from "../components/ProductForm"
import Spinner from '../components/Spinner'
import Status from "../components/Status"


const AddProduct = ()=>{
        const [addPattern, setAddPattern] = useState("mobile")
        const [model,SetModel] = useState("mobile")

        const {loading,error,addedProduct} = useSelector(state => state.addProduct)

        
        
        function handleChoice(model){
            setAddPattern(model)
            SetModel(model)
        }
       
       useEffect(() => {
          
       }, [addPattern,model])

    
    return (
        <>
            <div className='add-product'>
                <form >
                    <div className="select-cat">
                        <span>Category : </span>
                        <select className="cat-options" name="category">
                            <option onClickCapture={()=>handleChoice("mobile")} >mobile</option>
                            <option onClickCapture={()=>handleChoice("laptops")}>laptops</option>
                            <option onClickCapture={()=>handleChoice("pc hardware")}>pc hardware</option>
                            <option onClickCapture={()=>handleChoice("home devices")}>Home devices</option>
                            <option onClickCapture={()=>handleChoice("other")}>other</option>
                        </select>
                    </div>
                   <ProductForm pattern={addPattern} />
                </form>
                {loading ? <Spinner /> : error ? <Status isOpen = {true} status="fail"
                                         message="Ops... Somthing went wrong When trying to add new product" size="big"/> :
                    addedProduct==="success" ? <Status isOpen = {true} status="success"
                    message="New product added successfully" size="big"/> :null }
            </div>
          
        </>
        
    )
    
}


export default AddProduct;