import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {RenderComponent} from "../../Actions/sidebarActions"
import { getWishlist } from "../../Actions/wishlistActions";
import { getCartItems } from "../../Actions/cartActions";
import Badge from "../Badge";


const SideNave = ()=>{

        const  dispatch = useDispatch();
        const {userData}=useSelector(state=>state.userSignIn)
        const {SideComp} = useSelector(state => state.sidebarComponent);
        const {cartItems}= useSelector(state => state.cart)
        const {wishlistProducts}= useSelector(state => state.wishlist)
        
        
        const handleClick = (e,comp) => {
                e.preventDefault()
                const sideBar = document.querySelector(".sidebar")
                
               console.log(sideBar.classList)
               dispatch(RenderComponent(comp))
              
                if(!SideComp){
                    dispatch(RenderComponent(comp))

                    
               }
               else if(SideComp && SideComp.type.name === comp){
                dispatch(RenderComponent(""))

               }
               
            }
    useEffect(() => {
        dispatch(getWishlist())
        dispatch(getCartItems())

    }, [])        
            
    return <>
        <div className='side-nav'>
            <ul>
                <li><button  onClick={(e)=>handleClick(e,"Filter")}>
                    <i id="Filter" className="fas fa-filter"></i></button></li>
                <li>
                    <button onClick={(e)=>handleClick(e,"ShowCart")} style={{position:"relative"}}>
                        <i id="ShowCart" className="fas fa-shopping-cart"></i>
                        {cartItems?.length > 0 && <Badge num={cartItems.length} />}
                    </button>
                </li>
                {userData?<li><button onClick={(e)=>handleClick(e,"ShowWishlist")} style={{position:"relative"}}>
                    <i id="ShowWishlist" className="fas fa-clipboard-list-check"></i>
                    {wishlistProducts?.length > 0 && <Badge num={wishlistProducts.length} />}
                </button>
                </li>:null}
                <li><button onClick={(e)=>handleClick(e,"Questions")}><i className="fas fa-comments-alt"></i></button></li>
            </ul>
        </div>
    </>
}

export default SideNave; 