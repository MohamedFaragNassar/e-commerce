import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {updateProfile} from "../Actions/userAction"
import {addShipping} from "../Actions/shippingActions"
import {UPDATE_PROFILE_FAIL,CLEAR_UPDATE_PROFILE} from '../Constants/userConstants'
import Spinner from "../components/Spinner"
import Status from "../components/Status"

const EditProfile = () =>{
    
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [name,setName] = useState("")
    const [country,setCountry] = useState("")
    const [city,setCity] = useState("")
    const [address,setAddress] = useState("")
    const [postalcode,setPostal] = useState("")
    
    
    
    const {loading,error,update} = useSelector(state => state.updateUser)
    const {addLoading,addError,add} = useSelector(state => state.shipping)
    const dispatch = useDispatch()

   
    const handleUpdateProfile = (e)=>{
        e.preventDefault();
         if(password != confirmPassword){
             dispatch({type:UPDATE_PROFILE_FAIL,payload:"Password should match"})
             setTimeout(()=>{
                dispatch({type:CLEAR_UPDATE_PROFILE})
              },5000)
         }else{
            dispatch(updateProfile({
                userName: `${firstName} ${lastName}`,
                email,
                password,
            })) 
         }
    }

    const handleAddShipping = async(e) => {
        e.preventDefault()
        dispatch(addShipping({
            name,
            country,
            city,
            address,
            postalcode
        }))
     }

    

    return<>
        <div className="personal-info add-product">
            <h2>Personal Information</h2>
            <form onSubmit = {(e)=>handleUpdateProfile(e)} >
                <div className="add-pattern">
                    <div><span>First Name : </span><input onChange={(e)=>setFirstName(e.target.value)} type="text" name="firstName" /></div>
                    <div><span>Last Name : </span> <input onChange={(e)=>setLastName(e.target.value)} type="text" name="lastName" /></div>
                    <div><span>Change Password : </span><input onChange={(e)=>setPassword(e.target.value)} type="password" name="password"   /></div>
                    <div><span>Confirm Password : </span><input onChange={(e)=>setConfirmPassword(e.target.value)} type="password" name="confirmPassword"   /></div>
                    <div><span>Email : </span><input onChange={(e)=>setEmail(e.target.value)} type="email" name="email"   /></div>
                </div>
                {loading?<Spinner/>:<div className="add-btn-wrapper"><button className="add-btn">Update Profile</button></div>}
                {error? <Status isOpen="true" size="big" status="fail" message={error} />
               :update==="success"?<Status isOpen="true" size="big" status="success" message="personal information updated seccessfully" />:null}
            </form>
        </div>
        <div className="shipping-info add-product">
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
export default EditProfile;