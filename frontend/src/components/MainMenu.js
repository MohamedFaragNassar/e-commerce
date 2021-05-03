import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MainMenu = ({node}) => {
    
    const {userData} = useSelector(state => state.userSignIn)
    const [isOpen,setIsOpen] = useState(false)
    const handleShowMenu = (e) => {
        const icon = e.target.firstElementChild
        const action = icon.classList.contains("fa-chevron-down") ? "show" : "hide"
        if(action === "show"){
            icon.classList.remove("fa-chevron-down")
            icon.classList.add("fa-chevron-up")
        }else{
            icon.classList.remove("fa-chevron-up")
            icon.classList.add("fa-chevron-down")
       }
        setIsOpen(!isOpen)
    }


    return <>
        <div ref={node} id="mainmenu" className="ham-menu" >
            <div>
               <button onClick={(e)=>handleShowMenu(e)} >Categories
                    <i class="fas fa-chevron-down"></i>
               </button>
               {isOpen&&<ul id="projects-menu" className="projects-menu-items">
                  <Link to="/category/mobile" >Mobiles</Link>
                  <Link to="/category/laptops" >laptops</Link>
                  <Link to="/category/home devices" >Home Devices</Link>
                  <Link to="/category/other" >other</Link>
               </ul>}
           </div>
           <Link to="/mycart" >My Cart</Link>
           {userData&&<Link to="/mywishlist" >My Wishlist</Link>}
           <Link to="/contact" >Contact</Link>
        </div>
    </>
}

export default MainMenu
