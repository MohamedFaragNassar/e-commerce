import React, { useEffect } from "react"
import {useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import {removeFromCart,getCartItems} from "../Actions/cartActions"

const Cart = () => {
    const {cartItems}= useSelector(state => state.cart)
    const dispatch = useDispatch()
    

   const handleDelete = (id) =>{
       dispatch(removeFromCart(id))
   }

   useEffect(() => {
      dispatch(getCartItems())
   }, [])

    return <>
        {cartItems ? cartItems.length <= 0 ? 
            <div className="showCart">
                <h3>Shopping Cart</h3>
                <div>You have no items in the cart</div>
            </div>:
            <div className="showCart">
            <h3>Shopping Cart</h3>
            <ul>
                {cartItems.map(product => 
                    <li key={product.product}>
                        <img className="side-item-img" src={`../${product.image}`} />
                        <div className="side-items-body">
                            <div>
                                <div className="side-item-name" >{product.name}</div>
                                <button onClick={()=>handleDelete(product.product)} className="delete-btn" >
                                    <i className="fas fa-trash-alt"></i>
                                </button>
                            </div>
                            <div className="lower-sec">
                                <div className="side-item-price" >${product.price}</div>
                            </div>
                            
                        </div>
                    </li>
                )} 
           </ul>
           <Link to="/orders" className="clear-wishlist"  >Make Order</Link> 
        </div> : null}

    </>
}

export default Cart
