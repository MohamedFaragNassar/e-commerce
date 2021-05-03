import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import {deleteOrder,setdelivered,getAllOrders} from "../Actions/orderActions"
import { useDispatch, useSelector } from 'react-redux';
import Modal from "../components/Modal"
import Spinner from "../components/Spinner"
import Status from "../components/Status"
import { useEffect } from 'react';

const ManageOrders = (props) =>{
    
    const [modalOpen, setModalOpen] = useState(false)
    const [id, setId] = useState()
    const dispatch = useDispatch()
    const {userData} = useSelector(state => state.userSignIn)
    const {loading,error,delivered} = useSelector(state => state.deliverOrder)
    const {ordersLoading,ordersError,orders} = useSelector(state => state.allOrders)
    
    const handleCancel = async(id) => {
       
        dispatch(deleteOrder(id))
        setModalOpen(false)
    }

    const handleModel = (id) => {
        setId(id)
        setModalOpen(true)
    }

    const deliveerOrderHandler =(id)=>{
        dispatch(setdelivered({id}))
    }

    useEffect(() => {
        dispatch(getAllOrders())
    }, [])

    return<>
    { ordersLoading ? <div>loading...</div> : ordersError ? <div>error</div> : orders ? <>
        <div className="manage-products">
            <div className="manage-products-header">
                <span>{ props.additionalField ==="user" ? "Manage Orders" : "My Orders"}</span>
            </div>
            <div className="manage-orders">
                        
                <div className="manage-products-item">
                    {props.additionalField === "user" ?<span>User ID</span>:null}
                    <span className="productName">Order ID</span>
                    <span className="productName">Date</span>
                    <span>Total Price</span>
                    <span>Paid</span>
                    <span>Delivered</span>
                    { props.additionalField === "viewDetails" ? <span>View Details</span> : null}
                    <span>Cancel</span>
                </div> 
                            
                {orders.map(order=> 
                    <div className="manage-products-item">
                        {props.additionalField === "user" ?<span>{order.user}</span>:null}
                        <span className="productName">{order._id}</span>
                        <span className="productName">{order.createdAt}</span>
                        <span>$ {order.totalPrice}</span>
                        <span>{order.isPaid ? <i className="fas fa-check-circle true"></i> : 
                                <i className="fas fa-times-circle false"></i>}</span>
                        <span>{order.isDelivered ? <i className="fas fa-check-circle true"></i>  :
                            userData.isAdmin ?
                            order.isPaid? <button onClick={()=>deliveerOrderHandler(order._id)}
                                className="deliver-btn tooltip">
                                <i className="fad fa-truck-loading"></i>
                            </button>:<i className="fas fa-times-circle false"></i>
                            : <i className="fas fa-times-circle false"></i>}</span>
                        { props.additionalField === "viewDetails" ? 
                            <span><Link className="view-order-details" to={`/order/${order._id}`} >
                            <i className="fas fa-edit"></i></Link></span> : null}
                        <span>{!order.isPaid ? <button className="delete-product" onClick={()=>handleModel(order._id)} >
                            <i className="fas fa-trash-alt"></i>
                        </button>:null}</span>
                    </div>
                )}

                           
                </div>
        </div> 

                {loading ? <Spinner/>  : error ?
                <Status isOpen="true" status="fail" 
                message="Somthing went wrong, please try again"  size="big"/> :
                delivered === "success" ? <Status isOpen="true" status="success" 
                message="the order is marked as delivered successfully"  size="big" />:null }
    </>: <div></div>} 

    <Modal isOpen ={modalOpen} close={()=>setModalOpen(false)} 
        header="Cancelling Order" message="Are you sure want to cancel this order ?!" handler={()=>handleCancel(id)}/>
    </>
}
export default ManageOrders;