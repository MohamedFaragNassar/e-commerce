const {GET_WISHLIST_SUCCESS,GET_WISHLIST_FAIL,GET_WISHLIST_REQUEST, CLEAR_WISHLIST,
        CLEAR_WISHLIST_FAIL,CLEAR_WISHLIST_SUCCESS,CLEAR_WISHLIST_REQUEST,
        ADD_WISHLIST_SUCCESS,DELETE_WISHLIST_SUCCESS} = require("../Constants/wishlistConstants")


function getWishListReducer(state={wishlistProducts:[]},action){
    switch(action.type){
        case GET_WISHLIST_REQUEST :
            return {whislistLoading:true }
        case GET_WISHLIST_SUCCESS :
            return { whislistLoading:false , wishlistProducts: action.payload }    
        case GET_WISHLIST_FAIL :
            return {whislistLoading:false , whishlistError: action.payload}
        case ADD_WISHLIST_SUCCESS :
            try{
                return {wishlistProducts: [...state?.wishlistProducts,action.payload]}

            }catch(err){
                console.log(err)
            }
        case DELETE_WISHLIST_SUCCESS:
            return {wishlistProducts:[...state.wishlistProducts.filter(e => e._id != action.payload)]}    
        case CLEAR_WISHLIST:
            return {whislistLoading:false,wishlistProducts:{}};    
        default :
            return state;        
    }
}

function clearWishListReducer(state={},action){
    switch(action.type){
        case CLEAR_WISHLIST_REQUEST :
            return { ...state , loading:true }
        case CLEAR_WISHLIST_SUCCESS :
            return { loading:false , clear: action.payload }    
        case CLEAR_WISHLIST_FAIL :
            return {loading:false , error: action.payload}
        default :
            return state;        
    }
}

export {getWishListReducer,clearWishListReducer}