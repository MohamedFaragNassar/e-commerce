import{ADD_SHIPPING_REQUIST,ADD_SHIPPING_SUCCESS,ADD_SHIPPING_FAIL,GET_SHIPPING_SUCCESS,GET_SHIPPING_REQUIST,GET_SHIPPING_FAIL
    ,DELETE_SHIPPING_FAIL,DELETE_SHIPPING_REQUIST,DELETE_SHIPPING_SUCCESS,CLEAR_ADD_SHIPPING,
    MAKE_SHIPPING_DEFAULT_FAIL,MAKE_SHIPPING_DEFAULT_REQUIST,MAKE_SHIPPING_DEFAULT_SUCCESS} from "../Constants/shippingConstants"


function ShippingReducer(state={},action){
    switch(action.type){
        case ADD_SHIPPING_REQUIST :
            return { ...state , addLoading:true }
        case ADD_SHIPPING_SUCCESS :
            return { addLoading:false,add:"success" ,shippingInfo:action.payload}    
        case ADD_SHIPPING_FAIL :
            return {addLoading:false , addError: action.payload}
        
        case CLEAR_ADD_SHIPPING:
            return{...state,add:"",addError:undefined}    
        case GET_SHIPPING_REQUIST :
            return { ...state , getLoading:true }
        case GET_SHIPPING_SUCCESS :
            return { getLoading:false ,shippingInfo:action.payload}    
        case GET_SHIPPING_FAIL :
            return {getLoading:false , getError: action.payload}   
        
        case DELETE_SHIPPING_REQUIST :
            return { ...state , deleteLoading:true }
        case DELETE_SHIPPING_SUCCESS :
            return { deleteLoading:false ,shippingInfo:action.payload}    
        case DELETE_SHIPPING_FAIL :
            return {deleteLoading:false , deleteError: action.payload}         
        
        case MAKE_SHIPPING_DEFAULT_REQUIST :
            return {updateLoading:true}
        case MAKE_SHIPPING_DEFAULT_SUCCESS :
            return { updateLoading:false , shippingInfo:action.payload}    
        case MAKE_SHIPPING_DEFAULT_FAIL :
            return {updateLoading:false , updateError: action.payload}         
        default :
            return state;        
    }
}


export {ShippingReducer}