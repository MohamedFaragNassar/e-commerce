import React, { useState, useEffect } from "react"
import ShowProduct from "../components/ShowProduct"
const LaptosScreen = (props)=>{
    const [mobiles,setMobiles] = useState([]);

    useEffect(() => {
        fetch("/category/laptops")
            .then(res => res.json())
            .then(result => setMobiles(result))
            .catch(err => console.log(err))
        return () => {
            //cleanup
        }
    }, [])

    return <>

            <div className="show-products">
                {mobiles.map(prod => 
                     <ShowProduct productName={prod.productName} price = {prod.price} id = {prod._id} />
                )}
            </div> 
    
    </>
}

export default LaptosScreen;