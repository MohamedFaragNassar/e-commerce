import {GET_WISHLIST_FAIL,GET_WISHLIST_REQUEST,GET_WISHLIST_SUCCESS,
        CLEAR_WISHLIST_FAIL,CLEAR_WISHLIST_REQUEST,CLEAR_WISHLIST_SUCCESS,CLEAR_WISHLIST,
        ADD_WISHLIST_FAIL,ADD_WISHLIST_REQUEST,ADD_WISHLIST_SUCCESS,
        DELETE_WISHLIST_FAIL,DELETE_WISHLIST_REQUEST,DELETE_WISHLIST_SUCCESS} from "../Constants/wishlistConstants"
import Axios from "axios"

const getWishlist = () => async(dispach,getState) => {
    dispach({type: GET_WISHLIST_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.get("/api/wishlists/",{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        dispach({type:GET_WISHLIST_SUCCESS,payload:data})
    }catch(error){
        dispach({type:GET_WISHLIST_FAIL,payload:error})
    }
}

const clearWishList = ()=> async(dispach,getState)=>{
    dispach({type: CLEAR_WISHLIST_REQUEST})
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = await Axios.delete("/api/wishlists/deletewishlist",{
                headers:{
                    Authorization: `Bearer ${userData.token}`,
                }
           })
        dispach({type:CLEAR_WISHLIST_SUCCESS,payload:data})
        dispach({type:CLEAR_WISHLIST})
    }catch(error){
        dispach({type:CLEAR_WISHLIST_FAIL,payload:error})
    }
}

const addWishlist = (product) => async(dispatch,getState)=>{
    const {userSignIn:{userData}} = getState()
    const {data} = await Axios.post("/api/wishlists",{product},{
        headers:{
            Authorization: `Bearer ${userData.token}`,
        }
    })
    dispatch({type:ADD_WISHLIST_SUCCESS,payload:product})
}

const deleteWhishlist = (productID)=>async(dispatch,getState) =>{
    try{
        const {userSignIn:{userData}} = getState()
        const {data} = Axios.post(`/api/wishlists/deleteproduct`,{productID},{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        dispatch({type:DELETE_WISHLIST_SUCCESS,payload:productID})
    }catch(err){
        console.log(err)
    }
}


export {getWishlist,clearWishList,addWishlist,deleteWhishlist};