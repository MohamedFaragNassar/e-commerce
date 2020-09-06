import React from "react"


const SidebarFilter = (props)=>{

    return <>
        <div className="filter-container">
            <div className="filter-header">Filter Products</div>
            <div className="cat-filter">
                <input type="checkBox" value="Mobiles" name="mobiles"/> <span>Mobiles</span>
                <input type="checkBox" value="Laptops" name="Laptops"/> <span>Laptops</span>
                <input type="checkBox" value="pc" name="pc"/> <span>pc</span>
                <input type="checkBox" value="homedevices" name="homedevices"/> <span>Home Devices</span>
                <input type="checkBox" value="other" name="other"/> <span>other</span>
            </div>
            <div className="price-filter" >
                <div>
                    <span>from</span><input type="range" min="0" max="50000" />
                </div>
                <div>
                    <span>to</span><input type="range" min="0" max="50000" />
                </div>
            </div>
            
        </div>
    </>
}

export default SidebarFilter;