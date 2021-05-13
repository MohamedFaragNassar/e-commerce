import{ADD_SHIPPING_REQUIST,ADD_SHIPPING_SUCCESS,ADD_SHIPPING_FAIL,GET_SHIPPING_SUCCESS,GET_SHIPPING_REQUIST,GET_SHIPPING_FAIL
    ,DELETE_SHIPPING_FAIL,DELETE_SHIPPING_REQUIST,DELETE_SHIPPING_SUCCESS,CLEAR_ADD_SHIPPING,ADD_SHIPPING,
    MAKE_SHIPPING_DEFAULT_FAIL,MAKE_SHIPPING_DEFAULT_REQUIST,MAKE_SHIPPING_DEFAULT_SUCCESS} from "../Constants/shippingConstants"


function getShippingReducer(state={},action){
    switch(action.type){
        case GET_SHIPPING_REQUIST :
            return {getLoading:true }
        case GET_SHIPPING_SUCCESS :
            return { getLoading:false ,shippingInfo:action.payload}    
        case GET_SHIPPING_FAIL :
            return {getLoading:false , getError: action.payload}
        case ADD_SHIPPING :
            return {shippingInfo:[...state?.shippingInfo,action.payload]}   
        case DELETE_SHIPPING_SUCCESS :
            return {shippingInfo:[...state?.shippingInfo.filter(e => e._id != action.payload)]}    
        case MAKE_SHIPPING_DEFAULT_SUCCESS :
            const shipping = state?.shippingInfo
            shipping.forEach(e => {
                if(e._id == action.payload){
                    e.isDefault = true
                }else{
                    e.isDefault = false
                }
            });
            return {shippingInfo:shipping}    
        default :
            return state;        
    }
}

function addShippingReducer(state={},action){
    switch(action.type){
        case ADD_SHIPPING_REQUIST :
            return {addLoading:true }
        case ADD_SHIPPING_SUCCESS :
            return { addLoading:false,add:"success"}    
        case ADD_SHIPPING_FAIL :
            return {addLoading:false , addError: action.payload}
        case CLEAR_ADD_SHIPPING:
            return{add:""}  
        default:
            return state
    }
}



export {getShippingReducer,addShippingReducer}