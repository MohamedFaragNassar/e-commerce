import React from "react"
import {FILTER_COMPONENT,SHOW_WISHLIST,SHOW_SHIPPING,SHOW_QUISTIONS,
    SHOW_CART,HIDE_COMPONENT,} from "../Constants/sideBarConstants"
import SidebarFilter from "../components/sidebarComponents/Filter"
import ShowCart from "../components/sidebarComponents/ShowCart"
import Wishlist from "../components/sidebarComponents/Wishlist"
import Questions from "../components/sidebarComponents/Questions"

function sidebarReducer(state={},action){
    switch(action.type){
        case FILTER_COMPONENT:
            return {SideComp:<SidebarFilter/>}
        case SHOW_CART:
            return {SideComp:<ShowCart/>}
        case SHOW_WISHLIST:
            return {SideComp:<Wishlist/>}
        case SHOW_QUISTIONS :
            return {SideComp:<Questions />}
        case HIDE_COMPONENT:
            return {}
        default :
            return state;        
    }
}

export {sidebarReducer}