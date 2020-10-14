import React from "react"


const SideNave = (props)=>{
    const handleClick = () => {
        const sideBar = document.querySelector(".sidebar")
        const main = document.querySelector(".main")
        
        sideBar.classList.toggle("full-sidebar")
        main.classList.toggle("main-rs")
        
    }
    return <>
        <div className='side-nav'>
            <ul>
                <li><button onClick={()=>handleClick()}><img src="https://img.icons8.com/fluent/48/000000/filter.png"/></button></li>
                <li><button><img src="https://img.icons8.com/fluent/48/000000/shopping-cart.png"/></button></li>
                <li><button><img src="./assets/wishlist.svg" /></button></li>
                <li><button><img src="./assets/track.svg" /></button></li>
                <li><button><img src="https://img.icons8.com/fluent/48/000000/faq.png"/></button></li>
            </ul>
        </div>
    </>
}

export default SideNave; 