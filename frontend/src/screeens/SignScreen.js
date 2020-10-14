import React from "react"
import { useState} from "react"
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import {signin} from "../Actions/userAction"



const SignScreen = (props)=>{

   const [email, setEmail] = useState("");
   const [password,setPassord] = useState("");
   const dispatch = useDispatch();
   const userSignIn = useSelector(state => state.userSignIn);
   
    const handleSubmit = async (e)=>{
       e.preventDefault();
       
      dispatch(signin(email,password))
    }

    return <>
    <div className="add-product">
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email" >Email : </label>
                <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password" >Password : </label>
                <input type="password" name="password" onChange={(e)=>setPassord(e.target.value)} />
            </div>
            <div className="signin-links">
                <button type="submit" >Sign In</button>
                <Link to="/register">Create new Account</Link>
            </div>
        </form>
    </div>    
    </>
}
export default SignScreen;