import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import{deleteShipping} from "../Actions/shippingActions"
import Modal from '../components/Modal'

const Shipping = ({openAddShipping,shippingInfo}) =>{
    const [isOpen,setIsopen] = useState(false)
    const [id,setID] = useState()

    const dispatch = useDispatch() 

    const handleDelete = (id)=>{
        dispatch(deleteShipping(id))
        setIsopen(false)
    }
    const handleDelModel = (id)=>{
        setID(id)
        setIsopen(true)
    }


    return <>
            <div className="shipping-info">
                <div className="shipping-header">
                    <h2>Shipping Informations</h2>
                    <button onClick={()=>openAddShipping()} className="add-shipping-btn">Add New Location</button>
                </div>
                {shippingInfo&&shippingInfo.length >0 &&<table>
                    <tr>
                        <td>Location name </td>
                        <td>Country </td>
                        <td>City </td>
                        <td>Postal code </td>
                        <td>Address </td>
                        <td>Delete</td>
                    </tr>
                   
                        {shippingInfo&&shippingInfo.map(info => <>
                            <tr>
                                <td>{info.name}</td>
                                <td>{info.country}</td>
                                <td>{info.city}</td>
                                <td>{info.postalcode}</td>
                                <td>{info.address}</td>
                                <button className="delete-product" onClick={()=>handleDelModel(info._id)}><i class="fas fa-trash-alt"></i></button>
                            </tr>
                        </>)}
                    
                </table>
                    }
            </div>
            <Modal isOpen={isOpen} close={()=>setIsopen(false)} header="Deleting Shipping Location"
                 message="Are you sure you want to delete this shipping location !"
                handler={()=> handleDelete(id) } />
    </>
}

export default Shipping;