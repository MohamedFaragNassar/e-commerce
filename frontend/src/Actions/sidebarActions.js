import {FILTER_COMPONENT,SHOW_CART,SHOW_QUISTIONS,SHOW_WISHLIST,HIDE_COMPONENT,
        } from "../Constants/sideBarConstants"

const RenderComponent = (comp) => (dispach)=>{
    if(comp === "Filter"){
        dispach({type:FILTER_COMPONENT})
    }else if(comp === "ShowCart"){
        dispach({type:SHOW_CART})
    }else if(comp === "ShowWishlist"){
        dispach({type:SHOW_WISHLIST})
    }else if(comp === ""){
        dispach({type:HIDE_COMPONENT})
    }else if(comp === "Questions"){
        dispach({type:SHOW_QUISTIONS})
    }
    
}




export {RenderComponent};