import React from "react"
import { Link } from "react-router-dom"

const UnSignedUser = ()=>{
    
    return <>
         <div className="sign-btns">
           <Link to="/signin">Login</Link>
           <Link to="/register">Sign up</Link>
        </div>
    </>
}
export default UnSignedUser;