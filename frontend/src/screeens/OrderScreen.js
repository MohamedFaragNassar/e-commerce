import React, { useEffect, useState } from "react"
import {useDispatch, useSelector } from "react-redux"
import {removeFromCart,updateCart} from "../Actions/cartActions"
import {useHistory} from 'react-router-dom'
import {initializeOrder} from "../Actions/orderActions"
import {getShipping} from "../Actions/shippingActions"
import {Link} from 'react-router-dom'
import Status from '../components/Status'


const OrderScreen = ()=>{

    const {shippingInfo} = useSelector(state => state.shipping)
    const [totalPrice, setTotalPrice] = useState(0)
    const {cartItems}= useSelector(state => state.cart)
    const {userData} = useSelector(state=>state.userSignIn)
    const [shipping, setShipping] = useState()
    const [payment, setPayment] = useState()
    const [err,setErr] = useState()
    const dispatch = useDispatch()

   
   const history = useHistory()

   const handleDelete = (id) =>{
       dispatch(removeFromCart(id))
   }
    useEffect(() => {
        if(!userData){
            history.push("/signin/order")
        }
       
        if(cartItems){
            setTotalPrice(cartItems.reduce((a,b)=>{return a+b.price*b.qty},0))
        }

        if(!shippingInfo){
            dispatch(getShipping())
        }
        setErr(null)
    }, [cartItems,shippingInfo])
    
   const handleCount = (id,qty) =>{
        dispatch(updateCart(id,qty))
     
   }

   const hadleContinue = (order) =>{
        if(payment&&shipping){
            dispatch(initializeOrder(order))
            history.push("/preview")
        }else{
            setErr("please select a payment method and a shipping location")
           
        }
    }

    return <>

        <div className="make-order">
            {shippingInfo && shippingInfo.length>0?<div className = "shipping-select" >
                <div className="total-price">Total Items price : $ {totalPrice}</div>
                <div className="shipping">
                    <span>Shipping Location : </span>
                    <select required onChange={(e)=> setShipping(e.target.value)} >
                        <option value=""> -- select a shipping location -- </option>
                        {shippingInfo.map(shipping =>
                            <option key={shipping._id} value={shipping._id} >{shipping.name}</option>
                            )}
                    </select>
            </div>
            <div className="payment">
                    <span>Payment Method : </span>
                    <select required onChange={(e)=> setPayment(e.target.value)} >
                        <option value=""> -- select a payment method -- </option>
                        <option value="paypal">Paypal</option>
                    </select>
            </div>
            <button onClick={()=>hadleContinue({
                    orderItems: cartItems,
                    shipping,
                    payment,
                    itemsPrice:totalPrice,
            })} className="continue">Continue</button>
            {err&&<Status isOpen={true} message={err} size="small" status="fail" />}
        </div>:<div className="order-fail" >
            <Status isOpen={true} status="fail" size="small" message="You should have at least one shipping location to continue " />
            <Link to="/profile" >Add one now</Link>
            </div>}
       
        <div className="order-items">
            <h3>Order Items</h3>
            <ul>
                {cartItems.map(item =>
                    <li key={item.name} id="order-item">
                        <img src={item.image} />
                        <span className="order-item-price">{item.name}</span>
                        <span className="order-item-qty" >${item.onSlae?item.sale.salePrice:item.price}</span>
                        <select className="order-item-price" onChange={(e)=> handleCount(item.product,e.target.value)} defaultValue={item.qty} >
                            {[...Array(item.amount).keys()].map(x => 
                            <option  key={x+1} value={x+1}>{x+1}</option>
                            )}
                        </select>
                        <button onClick={()=>handleDelete(item.product)} className="delete-product">
                            <i className="fas fa-trash-alt"></i>
                        </button>
                    </li>
                    )}
                </ul>
            </div>
            

        </div>    

        </>
    
}
export default OrderScreen;