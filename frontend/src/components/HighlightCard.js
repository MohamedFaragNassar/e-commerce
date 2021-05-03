import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart } from '../Actions/cartActions'
import Review from './Review'

const HighlightCard = ({products}) => {
    
    const [index,setIndex] = useState(0)
    const dispatch = useDispatch()
    const addProductToCart = (product)=>{
        dispatch(addToCart(product))
    }
    const handleNext = () =>{
        if(index < products.length-1){
            setIndex(index+1)
        }else{
            setIndex(0)
        }
    }

    const handlePrev = () => {
        if(index > 0){
            setIndex(index-1)
        }else{
            setIndex(products.length-1)
        }
    }

    useEffect(() => {
        let interval = null;
        interval = setInterval(() => {
            if( products && index < products.length-1){
                setIndex(index => index + 1);
            }else{
                setIndex(1)
            }
        }, 5000);
        return () => clearInterval(interval);
    }, [index])
    
    return <>
    <div className="wrapper">
        <button onClick={()=>handleNext()} className="next-btn">{"<"}</button>
        <button onClick={()=>handlePrev()} className=" prev-btn">{">"}</button>
        <div className="product-img">
            <img src={products[index]?.mainImage} />
        </div>
        <div className="product-info">
            <Link to={`/product/${products[index]?._id}`} >{products[index]?.productName}</Link>
            <div className="highlight-disc">{products[index]?.discription}</div>
            <Review value = {products[index]?.rating} color="#2D6187" size={20} />
            <div className="product-price-btn">
                <div className="highlight-prices">
                    {products[index]?.onSale? <span className="sale" >${products[index]?.price}</span>:null}
                    <div className="product-price" >${ products[index]?.onSale? products[index]?.sale.salePrice : products[index]?.price}</div>
                </div>
                <button onClick={()=>addProductToCart(products[index])} type="button">buy now</button>
            </div>
        </div>

    </div>

    </>
}

export default HighlightCard
