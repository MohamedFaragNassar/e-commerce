import React from "react"


const SidebarFilter = (props)=>{

    return <>
        <div className="filter-container">
            <div className="filter-header">Filter Products</div>
            <ul className="cat-filter">
                <li><input type="checkBox" value="Mobiles" name="mobiles"/> <span>Mobiles</span></li> 
                <li><input type="checkBox" value="Laptops" name="Laptops"/> <span>Laptops</span></li>
                <li><input type="checkBox" value="pc" name="pc"/> <span>pc</span></li>
                <li><input type="checkBox" value="homedevices" name="homedevices"/> <span>Home Devices</span></li>
                <li><input type="checkBox" value="other" name="other"/> <span>other</span></li>
            </ul>
            <div className="price-filter" >
                <div>Price : </div>
                <div className="range-filter" >
                    <span>from : </span><input className="slider" type="range" min="0" max="50000" />
                </div>
                <div className="range-filter">
                    <span>to : </span><input className="slider" type="range" min="0" max="50000" />
                </div>
            </div>
            
        </div>
    </>
}

export default SidebarFilter;