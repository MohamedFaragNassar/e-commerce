import React from "react"
import {Link} from "react-router-dom"
import Review from "./Review"
import { useDispatch, useSelector } from "react-redux"
import {getWishlist,addWishlist,deleteWhishlist} from "../Actions/wishlistActions"
import {addToCart} from "../Actions/cartActions"


const ShowProduct = ({product})=>{

    const {userData} = useSelector(state => state.userSignIn)
    const {wishlistProducts} = useSelector(state => state.wishlist)
    const dispatch = useDispatch()
    let checkWhishlist 

    if( wishlistProducts && wishlistProducts.length > 0){
        checkWhishlist = wishlistProducts.find((wishlist) => wishlist._id.toString() === product._id.toString())
    }

    
    const addWishlistHandler = (product)=>{
        dispatch(addWishlist(product))
        
    }

    const addProductToCart = (product)=>{
        dispatch(addToCart(product))
    }


    const handleShowWhishlist = (e)=>{
        const icon = e.target.querySelector(".add-wishlist") 
                   || e.target.offsetParent.querySelector(".add-wishlist")
        if(icon){
          icon.classList.add("show-wishlist")
        }
    }

    const handleHideWhishlist = ()=>{
        const icon = document.querySelector(".show-wishlist")
        if(icon){
            icon.classList.remove("show-wishlist")
        }
    }
    
    const handleDelete = (id)=>{
        dispatch(deleteWhishlist(id))
    }

 

    return <>
        <div onMouseLeave={handleHideWhishlist} 
             onMouseEnter={(e)=>handleShowWhishlist(e)} className="product-card">
            <Link className="image-link" to={`/product/${product._id}`}><img src={product.mainImage} alt = "product"/></Link>
            <button onClick={()=> addProductToCart(product)} className="add-to-cart">
                <img src="../assets/cart.svg" />
                <span>Add To Cart</span>
                </button>
           { product.onSale? <div className="product-sale" >{`${product.sale.salePercentage} % Sale`}</div>:null}
            {userData ?<button 
                onClick={ checkWhishlist ? ()=>handleDelete(product._id) :() => addWishlistHandler(product)}
                className="add-wishlist">{ checkWhishlist ? <i className="fas fa-heart"></i> 
                : <i className="far fa-heart"></i>}</button>:<div></div>}
            <div className = "product-card-body">
                <Link to ={`/product/${product._id}`} className="product-name" >{product.productName}</Link>
                <div className="price-review">
                    <div className="card-prices">
                        {product.onSale? <div className="old" >${product.price}</div>:null}
                        <div className="product-price" >${ product.onSale? product.sale.salePrice : product.price}</div>
                    </div>
                    <div className="review"><Review value = {product.rating} color="#ffe05d" size={20} /></div>
                </div>
                
            </div>
        </div>
    </>
}
export default ShowProduct;