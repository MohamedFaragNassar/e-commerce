import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {registerUser} from "../Actions/userAction"
import Status from "../components/Status"
import {useHistory} from "react-router-dom"
import {CLEAR_REGISTER,USER_REGISTER_DATAERROR} from "../Constants/userConstants"
import {Link} from 'react-router-dom'

const RegisterScreen = ()=>{

    const history = useHistory()
    const [firstName,setFirstName] = useState()
    const [lastName,setLastName] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [confirmPassword,setConfirmPassword] = useState()
    
   
    const {error,dataError , user}= useSelector(state => state.registerUser)
    

    const dispatch = useDispatch()
    
    

   useEffect(() => {
      
        if(user==="success"){
            history.push("/signin")
        }
   }, [user])

    const handleRegister = (e) =>{
        if(email && password){
            e.preventDefault()
            if(password != confirmPassword){
                dispatch({type:USER_REGISTER_DATAERROR,payload:"Password should match"})
                setTimeout(()=>{
                    dispatch({type:CLEAR_REGISTER})
                },5000)
                e.target.reset()
            }else{
               dispatch(registerUser({
                    firstName,
                    lastName,
                    email,
                    password
                })) 
                document.querySelector(".register-form").reset()
            }
            
        }
       
    }

    

    return <>
    <form className="register-form">
            <h3>Join us now</h3>
                <div className="rigster-name">
                    <div>
                        <label>First Name  </label>
                        <input className="user-name" onChange={(e)=>setFirstName(e.target.value)} type="text" required={true} />
                    </div>
                    <div>
                        <label>Last Name  </label>
                        <input className="user-name" onChange={(e)=>setLastName(e.target.value)} type="text" required={true} />
                    </div>
                </div>
                <div>
                    <label>Email </label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" required={true} />
                </div>
                <div>
                    <label>Password </label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" required={true} />
                </div>
                <div>
                    <label>Confirm Password </label>
                    <input className="confirm-pass" onChange={(e)=>setConfirmPassword(e.target.value)} type="password" required={true} />
                   
                </div>
                <section>
                    <button onClick={(e)=>handleRegister(e)} >Sign up</button>
                    <Link to="/signin" >Already have Account? sign in </Link>
                </section>
            
              {/*   {loading ? <Spinner /> : null} */}
                {error?<Status isOpen={true} message={"Ops... Somthing went wrong, please try again"} status="fail" size="small" />:null}
                {dataError ? <Status isOpen={true} message={dataError} status="fail" size="small" /> : null  }
            </form>
    </>
}
export default RegisterScreen;