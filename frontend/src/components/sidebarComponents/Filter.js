import React, { useState } from "react"
import FilterModel from './filterModel'

const Filter = ()=>{
    
    const [addPattern, setAddPattern] = useState()

    function handleChoice(model){
        setAddPattern(model)
        
    }


    return <>
       
            <div className="filter">
                <div className="filter-header">Filter Products</div>
                    <div className="select-cat filter-select">
                        <div>Category : </div>
                        <select name="category" className="cat-options filter-options" name="category">
                            <option onClickCapture={()=>handleChoice(null)} value={null}></option>
                            <option onClickCapture={()=>handleChoice("mobile")} >mobile</option>
                            <option onClickCapture={()=>handleChoice("laptops")}>laptops</option>
                            <option onClickCapture={()=>handleChoice("pc hardware")}>pc hardware</option>
                            <option onClickCapture={()=>handleChoice("home devices")}>Home devices</option>
                            <option onClickCapture={()=>handleChoice("other")}>other</option>
                        </select>
                    </div>
                    <FilterModel pattern={addPattern} />
            </div>
            
    </>
}

export default Filter;