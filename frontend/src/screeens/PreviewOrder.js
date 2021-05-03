import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {makeOrder} from "../Actions/orderActions"
import {Redirect} from "react-router-dom"

const Preview = () =>{
    const dispatch = useDispatch()
    const order = useSelector(state => state.order)
    const {initialOrder,loading,error,madeOrder} = order
    console.log(initialOrder)
    console.log(order)

    let shippingPrice
    let taxPrice
    let totalPrice

    if(initialOrder){
        shippingPrice = initialOrder.itemsPrice > 500 ? 0 : 50 
        taxPrice = Number(.15 * initialOrder.itemsPrice).toFixed(2)
        totalPrice = initialOrder.itemsPrice + Number(taxPrice) + shippingPrice ;
    }

    
    const handleMakeOrder = (order) =>{
        dispatch(makeOrder(order))
        }

      if(initialOrder){  
        return<>
            <h2 className='preview-header'>Preview Order</h2>
            <div className="preview-order">
                
                <div className="place-order">
                    <table>
                        <tr>
                            <td className="first">Items Price : </td>
                            <td>$ {initialOrder.itemsPrice}</td>
                        </tr>
                        <tr>
                            <td className="first">Shipping Price : </td>
                            <td>$ {shippingPrice}</td>
                        </tr>
                        <tr>
                            <td className="first">Tax Price : </td>
                            <td>$ {taxPrice}</td>
                        </tr>
                    </table>
                    <button onClick={()=>handleMakeOrder({
                         orderItems: initialOrder.orderItems,
                         shipping:initialOrder.shipping,
                         payment:initialOrder.payment,
                         itemsPrice:initialOrder.itemsPrice,
                         tax:Number(taxPrice),
                         shippingPrice,
                         totalPrice,
                    })} className="continue" >Make Order</button>
                </div>
                <div className="order-items">
                    <div >
                        <ul>
                            {initialOrder.orderItems.map(item =>
                                <li>
                                    <img src={item.image} />
                                    <span className="order-item-name">{item.name}</span>
                                    <span className="order-item-qty">Qty : {item.qty}</span>
                                    <span className="order-item-price">Price : {item.price} * {item.qty} = $ {item.price * item.qty}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
         </>
                            
    }else{
        return <>
                {loading ? <div>loading...</div> : error ? <div>Ops... somthing went wrong</div> : madeOrder ?
                <>
                    <Redirect to={{pathname:`/order/${madeOrder._id}`}} />
                </>: <></> }
        </>
    }
}
export default Preview;