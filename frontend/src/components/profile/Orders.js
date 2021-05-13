import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getMyorders} from "../../Actions/orderActions"
import { Link } from 'react-router-dom';
import Modal from "..//Modal"
import {deleteOrder} from "../../Actions/orderActions"
import { useState } from 'react';
import {modifyDate} from '../../helpers/helpers'


const Orders = () =>{
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

    

    useEffect(() => {
       dispatch(getMyorders())
    }, [])

       
    return<>
        { loading ? <div>loading...</div> : error ? <div>{error.message}</div> : myOrders? <>
        <div className="manage-products my-orders">
            <div className="manage-products-header">
                <span>My Orders</span></div>
            <div className="manage-orders" style={{minWidth:770+"px"}}>
                        
                <div className="manage-products-item">
                    <span className="oName">Order ID</span>
                    <span className="oDate">Date</span>
                    <span className="oPrice">Total Price</span>
                    <span className="oIcon">Paid</span>
                    <span className="oIcon">Delivered</span>
                    <span className="oIcon"></span> 
                    <span className="oIcon"></span>
                </div> 
                {myOrders.map(order=> 
                    <div className="manage-products-item">
                        <span className="oName">{order._id}</span>
                        <span className="oDate">{modifyDate(new Date(order.createdAt))}</span>
                        <span className="oPrice">$ {order.totalPrice}</span>
                        <span className="oIcon">{order.isPaid ? <i className="fas fa-check-circle true"></i> : <i className="fas fa-times-circle false"></i>}</span>
                        <span className="oIcon">{order.isDelivered ? <i className="fas fa-check-circle true"></i>  :
                                <i className="fas fa-times-circle false"></i>}</span>
                        <span className="oIcon"><Link className="view-order-details" to={`/order/${order._id}`} >
                            <i className="fas fa-edit"></i></Link></span> 
                        <span className="oIcon">{!order.isPaid ? <button className="delete-product" onClick={()=>handleModel(order._id)} >
                            <i className="fas fa-trash-alt"></i>
                        </button>:null}</span>
                    </div>
                )}
                </div>
        </div> 

    </>: <div>You have no orders yet</div>} 

    <Modal isOpen ={modalOpen} close={()=>setModalOpen(false)} 
        header="Cancelling Order" message="Are you sure want to cancel this order ?!" handler={()=>handleCancel(id)}/> 
    </>
}
export default Orders;