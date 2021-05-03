import Axios from "axios";
import {INITIALIZE_ORDER,MAKE_ORDER_FAIL,MAKE_ORDER_REQUEST,MAKE_ORDER_SUCCESS,
        GET_ORDER_FAIL,GET_ORDER_REQUEST,GET_ORDER_SUCCESS
        ,GET_ORDERDETAILS_FAIL,GET_ORDERDETAILS_REQUEST,GET_ORDERDETAILS_SUCCESS,
        GET_ALLORDER_FAIL,GET_ALLORDER_REQUEST,GET_ALLORDER_SUCCESS,DELETE_ORDER
        , ADMIN_DELETE_ORDER,SET_DELIVERED_FAIL,SET_DELIVERED_REQUEST
        ,SET_DELIVERED_SUCCESS,CLEAR_SET_DELIVERED} from "../Constants/orderConstants"

const initializeOrder = (order) => (dispach,getState) =>{
    const {userSignIn:{userData}} = getState();
    dispach({type:INITIALIZE_ORDER,payload:order})
    localStorage.setItem(`${userData.userName} initailOrder`, JSON.stringify(order))
}


const makeOrder = (order) => async(dispach,getState) =>{
    dispach({type:MAKE_ORDER_REQUEST})
    const {userSignIn:{userData}} = getState()

    try{
        const {data} = await Axios.post("/api/orders/add",order,{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        console.log(data)
        dispach({type:MAKE_ORDER_SUCCESS,payload:data})
    }catch(error){
        dispach({type:MAKE_ORDER_FAIL,payload:error})
    }
    
}

const getMyorders = () => async(dispach,getState) =>{
    dispach({type:GET_ORDER_REQUEST})
    const {userSignIn:{userData}} = getState()

    try{
        const {data} = await Axios.get("/api/orders/",{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })

        dispach({type:GET_ORDER_SUCCESS,payload:data})
    }catch(error){
        dispach({type:GET_ORDER_FAIL,payload:error})
    }
}

const getOrderDetails = (id) => async(dispach,getState) =>{
    dispach({type:GET_ORDERDETAILS_REQUEST})
    const {userSignIn:{userData}} = getState()

    try{
        const {data} = await Axios.get(`/api/orders/orderdetails/${id}`,{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        dispach({type:GET_ORDERDETAILS_SUCCESS,payload:data})
    }catch(error){
        dispach({type:GET_ORDERDETAILS_FAIL,payload:error})
    }
}

const getAllOrders = () => async(dispach,getState) =>{
    dispach({type:GET_ALLORDER_REQUEST})
    const {userSignIn:{userData}} = getState()

    try{
        const {data} = await Axios.get("/api/orders/all",{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        dispach({type:GET_ALLORDER_SUCCESS,payload:data})
    }catch(error){
        dispach({type:GET_ALLORDER_FAIL,payload:error})
    }
}


const deleteOrder = (id) => async(dispach,getState) =>{
    try{
        const {userSignIn:{userData}} = getState()
        console.log(userData)
        const {data} = await Axios.delete(`/api/orders/${userData.isAdmin ? "deleteorder":"cancelorder"}/${id}`,{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        const deleteConst = userData.isAdmin ? ADMIN_DELETE_ORDER : DELETE_ORDER;
        dispach({type:deleteConst,payload:data})
    }catch(error){
        throw Error(error) 
    }
}
const setdelivered = (id) => async(dispatch,getState)=>{
    dispatch({type:SET_DELIVERED_REQUEST})
    const {userSignIn:{userData}} = getState()

    try{
        const {data} = await Axios.patch("/api/orders/deliver",id,{
            headers:{
                Authorization: `Bearer ${userData.token}`,
            }
        })
        dispatch({type:SET_DELIVERED_SUCCESS,payload:data})
        setTimeout(()=>{
            dispatch({type:CLEAR_SET_DELIVERED})
          },5000)
    }catch(error){
        dispatch({type:SET_DELIVERED_FAIL,payload:error})
        setTimeout(()=>{
            dispatch({type:CLEAR_SET_DELIVERED})
          },5000)
    }
}

export {initializeOrder, makeOrder,getMyorders,getOrderDetails,getAllOrders,deleteOrder,setdelivered}