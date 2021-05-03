import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Admin from "./Admin"
import NormarUser from "./NormalUser"
import {useClickToClose} from "../components/ClickToClose"
import {getUserDetails} from "../Actions/userAction"

const SignedUser = ()=>{

    const dispatch = useDispatch()
    
    const userNav = useRef()
    const  handleShowMenu = () =>{


        const menu = document.querySelector(".nav-user-menu")
        menu.classList.remove("show")
    }

    const {loading,error,userProfile} = useSelector(state=>state.userDetails) 


    const toggleShowMenu = ()=>{
        const menu = document.querySelector(".nav-user-menu")
        menu.classList.toggle("show")
    }
    
    const domNode = useClickToClose(handleShowMenu,userNav)
    const {userData:{isAdmin}} = useSelector(state => state.userSignIn)

    useEffect(() => {
        dispatch(getUserDetails())
    }, [])

    return <>
        <div ref={userNav} className="nav-user">
            <img src={`../${userProfile? userProfile.userImage:""}`} alt=""/>
            <button onClick={()=>toggleShowMenu()} className="nav-user-details">v</button>
        </div>
        <div ref={domNode}  id='user-menu' className="nav-user-menu">
                {isAdmin ? <Admin/> : <NormarUser/>}
        </div> 
    </>
}
export default SignedUser;