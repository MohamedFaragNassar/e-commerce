import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import {getOrderDetails} from '../Actions/orderActions'
import {PayPalButton} from "react-paypal-button-v2"
import Spinner from '../components/Spinner'
import Status from '../components/Status'
import AdressCard from '../components/profile/AdressCard'
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout" 
import Axios from "axios";


const stripePromise = loadStripe("pk_test_51K5lTIESHV2Ml2kk6ZUFCfKOtkJBv5KCVkxZHH4VGhCBJU8D1fxTlYVb4AyGmOoV2rhDgNljs1G7b7aKS2KHdpDV00N2ZTil7C");



const OrderDetails = (props)=>{
    
    const dispatch = useDispatch()
    const {loading,error,order} = useSelector(state => state.orderDetails)
    const [paypalButton, setPaypalButton] = useState(false)
    const [clientSecret, setClientSecret] = useState("");
    const {userData} = useSelector(state => state.userSignIn)
    const id = props.match.params.id
    useEffect(() => {
        
        dispatch(getOrderDetails(id))
       
    }, [dispatch])


    console.log(id)

    const getClientSecret = async() =>{
       try{
            const {data} = await Axios.post("/api/orders/payment/stripe",{id},{
                headers:{
                    Authorization: `Bearer ${userData.token}`,
                }
            }) 
            setClientSecret(data.clientSecret)
       }catch(err){
           console.log(err)
       }
    }

    useEffect(() => {
        getClientSecret()
    }, []);

    const appearance = {
        theme: 'stripe',
    };
    
    const options = {
        clientSecret,
        appearance,
    };

    const addPayPalScript = async () => {
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=AV9idFlb0CtXMBK5CnJTAouZzUGfUr52ghWi0700uwkqP9Pfiu1TDGgVKFlbdOiG7d_D8CJwJtsVwnr4&currency=USD`
        script.async = true
        script.onload = () => {
          setPaypalButton(true)
        }
        document.body.appendChild(script)
      }
  

    const handlePaymentSuccess =(paymentResult)=>{
        console.log(paymentResult)
        console.log("payment done")
    }
    const handlePaymentError = (error)=>{
        console.log(error)
        console.log("errrrrrrrrrrrrrrrrrrrrrrrrrrrr")

    } 

    if(order?.payment === "paypal"){
        if(order){
            if(! order.isPaid){
                 if (!window.paypal) {
                     addPayPalScript()
                 } else {
                   //  setPaypalButton(true)
                 }
             }
         }
    }
    
console.log(order)
    return <>
     {loading ? <Spinner/> : error ? <Status isOpen="true" status="fail" size="big"
                                        message="Somthing went wrong,please try again" /> 
     : order ? <>
        
            <div className="preview-order">
                
                {!order.isPaid ?<div className="place-order">
                    <table>
                        <tbody>
                        <tr>
                            <td className="first">Items Price : </td>
                            <td>$ {order.itemsPrice}</td>
                        </tr>
                        <tr>
                            <td className="first">Shipping Price : </td>
                            <td>$ {order.shippingPrice}</td>
                        </tr>
                        <tr>
                            <td className="first">Tax Price : </td>
                            <td>$ {order.tax}</td>
                        </tr>
                        <tr>
                            <td className="first">Total Price : </td>
                            <td>$ {order.totalPrice}</td>
                        </tr>
                        </tbody>
                    </table>
                     {order?.payment == "paypal" ?
                     paypalButton ? <PayPalButton amount={order.totalPrice} onError={handlePaymentError}
                     onSuccess={handlePaymentSuccess}/> : <div>loading...</div>:
                    clientSecret && (
                        <Elements options={options} stripe={stripePromise}>
                            <StripeCheckout id={id} />
                        </Elements>
                    )}
                </div>: <></>}
                <div className="order-items">
                    <div className="order-payment">
                        <span>Payment Method : </span><span>{order.payment}</span>
                        <div>{order.isPaid ? "The Order is Paid":"The Order is not Paid"}</div>
                    </div>
                    <div className="order-shipping">
                        <h3>Shipping Location :</h3>
                        <AdressCard location={order?.shipping} type="show" />
                    </div>
                    <div >
                        <ul>
                            {order.orderItems.map(item =>
                                <li key={item.name}>
                                    <img src={item.image} style={{marginRight:10+"px"}} />
                                    <span className="order-item-price">Name : {item.name}</span>
                                    <span className="order-item-price">Qty : {item.qty}</span>
                                    <span className="order-item-price">Price : {item.price} * {item.qty} = $ {item.price * item.qty}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

        </>: <div></div>}  
    </>
}

export default OrderDetails;