import React, { useState,useEffect } from 'react'
import ShowProduct from "../components/ShowProduct"
import Search from '../components/Search'
import { useDispatch, useSelector } from 'react-redux'
import {getAllProducts,getProducts} from '../Actions/productActions'
import HighlightCard from '../components/HighlightCard'

const Main = ()=>{

    const {products} = useSelector(state => state.allProducts)
    const {topRated} = useSelector(state => state.listProducts)

    let onSlaeProducts 
    if(products){
        onSlaeProducts = products.filter(product => product.onSale == true) 

    }
    
    const dispatch = useDispatch()

    let highlightedPoducts = onSlaeProducts

    if(highlightedPoducts.length < 5){
        function compare( a, b ) {
            if ( a.createdAt < b.createdAt ){
              return -1;
            }
            if ( a.createdAt > b.createdAt ){
              return 1;
            }
            return 0;
          }
        const newProducts = products?.sort(compare).slice(0,5) 
        highlightedPoducts = [ ...new Set(onSlaeProducts.concat(newProducts)) ]
        
    }

    
    useEffect(() => {

        dispatch(getAllProducts())
        dispatch(getProducts())
         
     }, [])

     return (
        <>
            <div className = "search">
                <Search />
            </div> 
            {highlightedPoducts&&<HighlightCard products={highlightedPoducts} />} 
           <div className="toprated">
                {topRated&&topRated.map(prod => 
                     {return prod[1].length>0&&<div key={prod}  className="toprated" >
                         <div className="toprated-header">{`Top Rated ${prod[0]}`}</div>
                         <div className="show-products">{prod[1].map(e => 
                            <ShowProduct product={e} key={e._id} />    
                        )}</div>
                     </div>}
                )}
            </div> 
        </>
    )
}

export default Main;