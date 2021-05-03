import React from 'react'

const DefaultAddress = ({location}) => {
   
    return <>
        {location&&<div className="default-address">
        <span className="default">Default Address</span>
        <h3>{location.name}</h3>
        <div>
            <span>Country : </span>
            <span>{location.country}</span>
        </div>
        <div>
            <span>City : </span>
            <span>{location.city}</span>
        </div>
        <div>
            <span>Postal code : </span>
            <span>{location.postalcode}</span>
        </div>
        <div>
            <span>Address : </span>
            <span>{location.address}</span>
        </div>
       
    </div>}
    </>
}

export default DefaultAddress
