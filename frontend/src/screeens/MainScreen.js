import React, { useState,useEffect } from 'react'
import ShowProduct from "../components/ShowProduct"

const Main = (props)=>{

    const [products,setProducts] = useState([])

     useEffect(() => {
         
        fetch("/products")
            .then(res => res.json())
            .then(result => setProducts(result))
            .catch(err => console.log(err))

         return () => {
            // cleanup
         }
     }, [])

     return (
        <>
            <div className= "hot-offer">

            </div>
                
            <div className = "search">
                <form className = "search-form">
                    <input className="search-input" type="text" ></input>
                    <button className="search-btn" >search</button>
                </form>
            </div>
                    
               
            <div className="show-products">
                {products.map(prod => 
                     <ShowProduct productName={prod.productName} price = {prod.price} />
                )}
            </div> 
        </>
    )
}

export default Main;