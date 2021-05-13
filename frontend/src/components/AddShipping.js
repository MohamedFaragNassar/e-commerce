import React, {useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {addShipping} from "../Actions/shippingActions"
import Spinner from "../components/Spinner"
import Status from "../components/Status"

const AddShipping = ({node,close}) => {
    const [name,setName] = useState("")
    const [country,setCountry] = useState("")
    const [city,setCity] = useState("")
    const [address,setAddress] = useState("")
    const [postalcode,setPostal] = useState("")
    
    const dispatch = useDispatch()

    const {addLoading,addError,add} = useSelector(state => state.addShipping)

    
    const handleAddShipping = async(e) => {
        e.preventDefault()
        dispatch(addShipping(
            name,
            country,
            city,
            address,
            postalcode
        ))
        close()
     }


    return <>
        <div className="overlay"></div>
        <div  ref={node} id="addshipping" className="add-shipping add-product modal">
            <h2>shipping Information</h2>
            <form onSubmit = {(e)=>handleAddShipping(e)} >
                <div className="add-pattern">
                    <div><span>Name : </span> <input onChange={(e)=>setName(e.target.value)} type="text"  required={true}/></div>
                    <div><span>Country : </span> <input onChange={(e)=>setCountry(e.target.value)} type="text"  required={true}/></div>
                    <div><span>City : </span><input onChange={(e)=>setCity(e.target.value)} type="text"  required={true}  /></div>
                    <div><span>Address : </span><input onChange={(e)=>setAddress(e.target.value)} type="text"  required={true}  /></div>
                    <div><span>Postal Code : </span><input onChange={(e)=>setPostal(e.target.value)} type="text"  required={true}  /></div>
                </div>
               {addLoading?<Spinner/>: <div className="add-btn-wrapper"><button className="add-btn">Add Shipping Location</button></div>}
               {addError? <Status isOpen="true" size="big" status="fail" message="Somthing went wrong" />
               :add==="success"?<Status isOpen="true" size="big" status="success" message="shipping location added successfully" />:null}
            </form>
        </div>
    </>
}

export default AddShipping
