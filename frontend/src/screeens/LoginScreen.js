import React, { useEffect } from "react"
import { useState} from "react"
import { Link , useHistory} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import {readyAccount, signin} from "../Actions/userAction"
import Spinner from "../components/Spinner"
import Status from "../components/Status"

const SignScreen = (props)=>{

   const [email, setEmail] = useState("");
   const [password,setPassword] = useState("");
   //const [location,setLocation] = useState("/");
   let location = "/"
   const dispatch = useDispatch();
   const history = useHistory()
   
   const x=  useSelector(state => state.userSignIn)
   const {loading,error,userData,dataError} = x


   console.log(x)

    const handleSubmit = async (e)=>{
       e.preventDefault();
      dispatch(signin(email,password))
      e.target.reset()
    }
    
    const handlSignin = (type) => {
        dispatch(readyAccount(type))
    }

    useEffect(() => {
        if(window.location.pathname.includes("order")){
            //setLocation("/orders")
            location = "/orders"
        }
        if(userData){
            const items = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
            if(items.length > 0){
                localStorage.setItem("cartItems",[])
                localStorage.setItem(`${userData.userName}cartItems`,JSON.stringify(items))
            }
            if(userData.isAdmin){
                //setLocation("/admin")
                location="/admin"
            }
            history.push(location)
        }
    }, [userData])

    return <>
        <form onSubmit={(e)=>handleSubmit(e)} className="login-form">
                <h3>Welcome</h3>
                <div>
                    <label>Email </label>
                    <input onChange={(e)=>setEmail(e.target.value)} type="email" required={true} />
                </div>
                <div>
                    <label>Password </label>
                    <input onChange={(e)=>setPassword(e.target.value)} type="password" required={true} />
                </div>
                <section>
                    <button type="submit">Sign in</button>
                    <Link to="/register">create new account </Link>
                </section>
                {loading ? <Spinner />:null}
                {error ? <Status isOpen={true} status="fail" message="Ops... somthing went wrong, please try again" size="small" />:null}
                {dataError ?  <Status isOpen={true} status="fail" message={dataError} size="small" />:null }
                
                <div className="ready-accounts">
                    <div onClick={()=>handlSignin("client")} className="pre-made">
                        <img src="account.png" />
                        <span>Client Account</span>
                    </div>
                    <div onClick={()=>handlSignin("admin")} className="pre-made">
                        <img src="account.png" />
                        <span>Admin Acoount</span>
                    </div>
                </div>
        </form>
    </>
}
export default SignScreen;