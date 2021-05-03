import React from "react"
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {logout} from "../Actions/userAction"

const Admin = ()=>{

    const dispatch = useDispatch()
    function hideMenu(){
        const menu = document.querySelector(".nav-user-menu")
        menu.classList.remove("show")
    }
    const HandleLogout = (e) => {
        e.preventDefault()
        dispatch(logout())
        hideMenu();
      }
    
    return <>
        <ul>
            <li><Link onClick= {()=> hideMenu()} to="/manage">Manage</Link></li>
            <li><Link  onClick= {(e)=> HandleLogout(e)}  to="/">Log out</Link></li>
       </ul>
    </>
}

export default Admin;