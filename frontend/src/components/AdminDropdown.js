import React from "react"
import { Link } from "react-router-dom";

const UserDropdown = ()=>{
    function hideMenu(){
        const menu = document.querySelector(".nav-user-menu")
        menu.classList.remove("show")
    }
    return <>
        <ul>
            <li><Link onClick= {()=> hideMenu()} to="/manage">Manage</Link></li>
            <li><Link  onClick= {()=> hideMenu()}  to="">Edit profile</Link></li>
            <li><Link  onClick= {()=> hideMenu()}  to="">Log out</Link></li>
       </ul>
    </>
}
export default UserDropdown;