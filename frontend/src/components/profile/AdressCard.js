import React from 'react'
import { useDispatch } from 'react-redux'
import {deleteShipping,makeDefault} from '../../Actions/shippingActions'
const AdressCard = ({location,type}) => {

    const dispatch = useDispatch()
    
    const handleDeleteAdress = ()=>{
        dispatch(deleteShipping(location?._id))
    }

    const handleUpdateAdress = () => {
        dispatch(makeDefault(location?._id))
    }

    return <>
        <div className="address-card" style={location?.isDefault?{ paddingTop:30+"px" }:null}>
        {location?.isDefault&&<span className="default">Default Address</span>}
        <h3>{location?.name}</h3>
        <div>
            <span>Country : </span>
            <span>{location?.country}</span>
        </div>
        <div>
            <span>City : </span>
            <span>{location?.city}</span>
        </div>
        <div>
            <span>Postal code : </span>
            <span>{location?.postalcode}</span>
        </div>
        <div>
            <span>Address : </span>
            <span>{location?.address}</span>
        </div>
        {type!="show"&&<div className="btns">
            <button onClick={()=>handleDeleteAdress()}>Remove</button>
            <button onClick={()=>handleUpdateAdress()}>Make Default</button>
        </div>}
    </div>
    </>
}

export default AdressCard
