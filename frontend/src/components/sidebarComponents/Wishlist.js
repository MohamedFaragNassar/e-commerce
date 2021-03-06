import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addToCart } from "../../Actions/cartActions"
import {getWishlist,clearWishList,deleteWhishlist} from "../../Actions/wishlistActions"
import Spinner from '../../components/Spinner'



const ShowWishlist = ()=>{
    const dispatch = useDispatch()
    const {wishlistProducts}= useSelector(state => state.wishlist)
    const {loading,error} = useSelector(state => state.clearWhishlist)
    const x = wishlistProducts?.length;
    
   
   
    const handleClear = () =>{
       dispatch(clearWishList())
    }

    const handleDelete = (id)=>{
        dispatch(deleteWhishlist(id))
        dispatch(getWishlist())

    }

    const addProductToCart = (product)=>{
        dispatch(addToCart(product))
    }

    useEffect(() => {
        dispatch(getWishlist())
    }, [])

    if(x > 0){

    

    return <>
       
        <div className="showCart">
            <h3>WishList</h3>
            <ul>
                {wishlistProducts.map(product => 
                    <li key={product._id}>
                     <div className="cart-item-container"><img className="side-item-img" src={`${product.mainImage}`} /></div>
                     <div className="side-items-body">
                         <div>
                             <div className="side-item-name turncate" >{product.productName}</div>
                             <button onClick={()=>handleDelete(product._id)} className="delete-btn" >
                                 <i className="fas fa-trash-alt icon-color"></i>
                             </button>
                         </div>
                         <div className="lower-sec">
                                <div className="side-item-price" >${product.price}</div>
                                <button className="side-item-cart"  onClick={()=> addProductToCart(product)} >
                                    <i style={{fontSize:20+"px"}} className="fas fa-shopping-cart icon-color"></i>
                                </button>
                         </div>
                         
                     </div>
                 </li>
                )} 
            </ul>
            {loading ? <Spinner /> :<button className="clear-wishlist" onClick={()=> handleClear()} >Clear Wishlist</button>}
            {error ? <div>Smothing went wrong</div> : null}
        </div>
    </>
     }else{
         return <>
        <div className="showCart">
            <h3>WishList</h3>
            <div>You have no items in the wishlist</div>
        </div>

         </>
     }
}

export default ShowWishlist;