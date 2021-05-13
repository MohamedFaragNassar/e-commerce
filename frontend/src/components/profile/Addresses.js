import React, { useState } from 'react'
import AdressCard from './AdressCard'
import AddShipping from '../AddShipping'
import {useClickToClose} from '../../helpers/CTC'

const Addresses = ({address}) => {
    const [isOpen,setIsOpen] = useState(false)
    const node = useClickToClose(()=>setIsOpen(false),"#addshipping")
    return <>
        <div className="address">
            <button className="add-address-btn" onClick={()=>setIsOpen(true)}>
                <i className="fal fa-plus-circle"></i>
                <span>Add New</span>
            </button>
            {address&& address.map(loc => 
                <AdressCard location={loc} key={loc._id} />    
            )}
        </div>
        {isOpen&&<AddShipping node={node} close={()=>setIsOpen(false)} />}
    </>
}

export default Addresses
