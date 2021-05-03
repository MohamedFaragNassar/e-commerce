import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {logout} from "../Actions/userAction"


const NormalUser = (props)=>{
    const history = useHistory()
    
    const dispatch = useDispatch()
    function hideMenu(){
        const menu = document.querySelector(".nav-user-menu")
        menu.classList.remove("show")
    }
    const HandleLogout = (e) => {
        e.preventDefault();
        dispatch(logout())
        hideMenu();
        history.push("/")
      }
    
    return <>
        <ul ref={props.node} >
            <li><Link onClick= {()=> hideMenu()} to={"/profile/"}>Veiw Profile</Link></li>
            <li><Link  onClick= {(e)=> HandleLogout(e)}  to="/">Log out</Link></li>
       </ul>
    </>
   
}
export default NormalUser;