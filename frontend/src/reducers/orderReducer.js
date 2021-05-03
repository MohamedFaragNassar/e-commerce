import {INITIALIZE_ORDER,MAKE_ORDER_FAIL,MAKE_ORDER_SUCCESS,MAKE_ORDER_REQUEST
    ,GET_ORDER_SUCCESS,GET_ORDER_REQUEST,GET_ORDER_FAIL,
    GET_ORDERDETAILS_SUCCESS,GET_ORDERDETAILS_REQUEST,GET_ORDERDETAILS_FAIL,
GET_ALLORDER_SUCCESS,GET_ALLORDER_REQUEST,GET_ALLORDER_FAIL,DELETE_ORDER,ADMIN_DELETE_ORDER,
SET_DELIVERED_FAIL,SET_DELIVERED_SUCCESS,SET_DELIVERED_REQUEST,CLEAR_SET_DELIVERED} from "../Constants/orderConstants"

const makeOrderReducer = (state={},action)=>{
    switch(action.type){
        case INITIALIZE_ORDER :
            return {initialOrder: action.payload}
        case MAKE_ORDER_REQUEST :
            return {...state,initialOrder:NaN,loading:true}   
        case MAKE_ORDER_SUCCESS : 
            return {loading:false,initialOrder:NaN ,madeOrder:action.payload}     
        case MAKE_ORDER_FAIL :
            return {loading:false, initialOrder:NaN,error:action.payload}    
        default:
            return state;    
    }
}

const getOrdersReducer = (state={},action)=>{
    switch(action.type){
        case GET_ORDER_REQUEST :
            return {...state,loading:true}   
        case GET_ORDER_SUCCESS : 
            return {loading:false, myOrders:action.payload}     
        case GET_ORDER_FAIL :
            return {loading:false, error:action.payload}   
        case DELETE_ORDER :
            return{loading:false, myOrders:state.myOrders.filter(order =>{return order._id != action.payload})}     
        default:
            return state;    
    }
}

const getOrderDetailssReducer = (state={},action)=>{
    switch(action.type){
        case GET_ORDERDETAILS_REQUEST :
            return {...state,loading:true}   
        case GET_ORDERDETAILS_SUCCESS : 
            return {loading:false, order:action.payload}     
        case GET_ORDERDETAILS_FAIL :
            return {loading:false, error:action.payload}    
        default:
            return state;    
    }
}

const getAllOrdersReducer = (state={},action)=>{
    switch(action.type){
        case GET_ALLORDER_REQUEST :
            return {...state,ordersLoading:true}   
        case GET_ALLORDER_SUCCESS : 
            return {ordersLoading:false, orders:action.payload}     
        case GET_ALLORDER_FAIL :
            return {ordersLoading:false, ordersError:action.payload}    
        case ADMIN_DELETE_ORDER :
            return{ordersLoading:false, orders:state.orders.filter(order =>{return order._id != action.payload})}    
        default:
            return state;    
    }
}

const deliverOrderReducer = (state={},action)=>{
    switch(action.type){
        case SET_DELIVERED_REQUEST:
            return{...state,loading:true}
        case SET_DELIVERED_SUCCESS:
            return{loading:false,delivered:action.payload}   
        case SET_DELIVERED_FAIL:
            return {deliverLoading:false,error:action.payload}         
        case CLEAR_SET_DELIVERED:
            return {}
        default:
            return state;    
    }
}

export {makeOrderReducer,getOrdersReducer,getOrderDetailssReducer,getAllOrdersReducer,deliverOrderReducer}