import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getMyorders} from "../Actions/orderActions"
import { Link } from 'react-router-dom';
import Modal from "../components/Modal"
import {deleteOrder} from "../Actions/orderActions"
import { useState } from 'react';
import {modifyDate} from '../helpers/helpers'

const MyOrders = () =>{
    
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false)
    const [id, setId] = useState()
    
    const handleModel = (id) => {
        setId(id)
        setModalOpen(true)
    }

    const handleCancel = async(id) => {
       
        dispatch(deleteOrder(id))
        setModalOpen(false)
    }

    const orders = useSelector(state => state.getOrders)
    const {loading, error, myOrders} = orders

    console.log(orders)

    useEffect(() => {
       dispatch(getMyorders())
    }, [])

        console.log(orders)
    return<>
        { loading ? <div>loading...</div> : error ? <div>{error.message}</div> : myOrders ? <>
        <div className="manage-products my-orders">
            <div className="manage-products-header">
                <span>My Orders</span></div>
            <div className="manage-products-body">
                        <div className="manage-products-item">
                            <span className="productName">Order ID</span>
                            <span className="productName">Date</span>
                            <span>Total Price</span>
                            <span>Paid</span>
                            <span>Delivered</span>
                            <span>View Details</span> 
                            <span>Cancel</span>
                        </div>
                            {myOrders.map(order=> 
                                <div className="manage-products-item">
                                    <span className="productName">{order._id}</span>
                                    <span className="productName">{modifyDate(new Date)}</span>
                                    <span>$ {order.totalPrice}</span>
                                    <span>{order.isPaid ? <i class="fas fa-check-circle true"></i> : <i class="fas fa-times-circle false"></i>}</span>
                                    <span>{order.isDelivered ? <i class="fas fa-check-circle true"></i>  :
                                         <i class="fas fa-times-circle false"></i>}</span>
                                        <span><Link className="view-order-details" to={`/order/${order._id}`} >
                                        <i class="fas fa-edit"></i></Link></span> 
                                    <span>{!order.isPaid ? <button className="delete-product" onClick={()=>handleModel(order._id)} >
                                        <i class="fas fa-trash-alt"></i>
                                    </button>:null}</span>
                                </div>
                            )}
                        
                </div>
        </div> 

    </>: <div></div>} 

    <Modal isOpen ={modalOpen} close={()=>setModalOpen(false)} 
        header="Cancelling Order" message="Are you sure want to cancel this order ?!" handler={()=>handleCancel(id)}/> 
    </>
}
export default MyOrders;