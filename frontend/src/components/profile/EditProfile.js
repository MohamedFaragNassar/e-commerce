import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {updateProfile} from "../../Actions/userAction"
import Spinner from "../Spinner"
import Status from "../Status"
import { useState } from 'react'

function EditProfile({node}) {
    
    const {userProfile} =  useSelector(state => state.userDetails)
    const [firstName,setFirstName] = useState(userProfile?.firstName)
    const [lastName,setLastName] = useState(userProfile?.lastName)
    const [email,setEmail] = useState(userProfile?.email)
    

    
    const dispatch = useDispatch()

    const {loading,error,update} = useSelector(state => state.updateUser)

    
    const handleUpdateProfile = (e)=>{
        e.preventDefault();
        dispatch(updateProfile({
            firstName,
            lastName,
            email,
            
        })) 
       
    }

    return <>
        <div ref={node} id="editprofilr" className=" edit-profile add-shipping add-product">
            <h2>Personal Information</h2>
            <form onSubmit = {(e)=>handleUpdateProfile(e)} >
                <div className="edit-profile-inputs">
                    <div><span>First Name : </span> <input onChange={(e)=>setFirstName(e.target.value)} defaultValue={userProfile.firstName} 
                    type="text" name="firstName" /></div>
                    <div><span>Last Name : </span> <input onChange={(e)=>setLastName(e.target.value)} defaultValue={userProfile.lastName}
                    type="text" name="lastName" /></div>
                    <div><span>Email : </span><input onChange={(e)=>setEmail(e.target.value)} defaultValue={userProfile.email}
                    type="email" name="email"   /></div>
                </div>
                {loading?<Spinner/>:<div className="add-btn-wrapper"><button className="add-btn">Update Profile</button></div>}
            </form>
        {error? <Status isOpen="true" size="small" status="fail" message={error} />
        :update==="success"?<Status isOpen="true" size="small" status="success" message="personal information updated seccessfully" />:null}
        </div>
    </>
}

export default EditProfile
