import React from "react"
import {Route, Redirect} from "react-router-dom"
import {useSelector } from "react-redux"

 const ProtectedRoute = ({component:Component,...rest}) =>{
  const {userData} = useSelector(state => state.userSignIn)
    return (
        <Route {...rest} render = {props => {
            if(userData && userData.isAdmin ){
                return <Component {...props} />
            }else{
                return <Redirect to={{pathname:"/"}}/>
            }
        }} />
    )
  
    
}

export default ProtectedRoute;