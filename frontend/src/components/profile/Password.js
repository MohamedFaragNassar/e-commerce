import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changepassword } from '../../Actions/userAction'
import Spinner from "../Spinner"
import Status from "../Status"
const Password = () => {
    const [Error,setError] = useState()
    const [old,setOld] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const {loading,error,newPassword} = useSelector(state => state.changePassword)
    const dispatch = useDispatch()
  
    const handleUpdatePassword = (e) =>{
        e.preventDefault()
        if(password != confirmPassword){
            setError("password should match")
            setTimeout(()=>{
                setError(null)
                const form = document.getElementById('change_password_form')
                form.reset()
            },3000)
        }else{
            dispatch(changepassword(old,password))
            const form = document.getElementById('change_password_form')
            form.reset()
        }
    }
    return <>
        <div className=" edit-profile  add-product">
            <h2>Changing Password</h2>
            <form id="change_password_form" onSubmit = {(e)=>handleUpdatePassword(e)} >
                <div className="edit-profile-inputs">
                    <div><span>Old Password : </span> <input onChange={(e)=>setOld(e.target.value)}  
                    type="password" name="firstName" /></div>
                    <div><span>New Password : </span> <input onChange={(e)=>setPassword(e.target.value)} 
                    type="password" name="lastName" /></div>
                    <div><span>Confirm Password : </span><input onChange={(e)=>setConfirmPassword(e.target.value)}
                    type="password" name="email"   /></div>
                </div>
                {loading?<Spinner/>:<div className="add-btn-wrapper"><button className="add-btn">Change Password</button></div>}
            </form>
        {error? <Status isOpen="true" size="small" status="fail" message={error.message} />
        :Error? <Status isOpen="true" size="small" status="fail" message={Error} />
        :newPassword?<Status isOpen="true" size="small" status="success" message="password changed seccessfully" />:null}
        </div>
    </>
}

export default Password
