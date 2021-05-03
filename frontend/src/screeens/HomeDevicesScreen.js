import React, { useState, useEffect } from "react"
import ShowProduct from "../components/ShowProduct"
const HomeDevicesScreen = (props)=>{
    const [mobiles,setMobiles] = useState([]);

    useEffect(() => {
        fetch("/category/homedevices")
            .then(res => res.json())
            .then(result => setMobiles(result))
            .catch(err => console.log(err))
        
    }, [])

    return <>

            <div className="show-products">
                {mobiles.map(prod => 
                     <ShowProduct productName={prod.productName} price = {prod.price} id = {prod._id} />
                )}
            </div> 
    
    </>
}

export default HomeDevicesScreen;