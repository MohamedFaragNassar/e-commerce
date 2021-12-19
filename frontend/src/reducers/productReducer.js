import {LIST_PRODUCTS_FAIL,LIST_PRODUCTS_REQUEST,LIST_PRODUCTS_SUCCESS,DELETE_PRODUCTS,
    ADD_PRODUCTS_FAIL,ADD_PRODUCTS_REQUEST,ADD_PRODUCTS_SUCCESS,
    GET_PRODUCT_DETAILS_FAIL,GET_PRODUCT_DETAILS_REQUEST,GET_PRODUCT_DETAILS_SUCCESS,
    UPDATE_PRODUCTS_SUCCESS,UPDATE_PRODUCTS_REQUEST,UPDATE_PRODUCTS_FAIL,CLEAR_ADD_PRODUCT
    ,LIST_CATEGORY_FAIL,LIST_CATEGORY_SUCCESS,LIST_CATEGORY_REQUEST,
    GET_INFO_FAIL,GET_INFO_SUCCESS,GET_INFO_REQUEST,CLEAR_INFO,GET_FILTERED_PRODUCTS_SUCCESS,
    GET_FILTERED_PRODUCTS_REQUEST,GET_FILTERED_PRODUCTS_FAIL,CLEAR_FILTER_PRODUCTS,
    GET_SEARCH_FAIL,GET_SEARCH_REQUEST,GET_SEARCH_SUCCESS,CLEAR_SEARCH,
    ADD_COMMENT_REQUEST,ADD_COMMENT_FAIL,ADD_COMMENT_SUCCESS,CLEAR_ADD_COMMENT, ADD_SALE_REQUEST,
    ADD_SALE_SUCCESS, ADD_SALE_FAIL, CLEAR_ADD_SALE,UPDATE_PRODUCT,ADD_COMMENT,
    DELETE_SALE_FAIL,DELETE_SALE_REQUEST,DELETE_SALE_SUCCESS,CLEAR_DELETE_SALE,
    GET_ALL_PRODUCTS_FAIL,GET_ALL_PRODUCTS_REQUEST,GET_ALL_PRODUCTS_SUCCESS,
    GET_REVIEWS_FAIL,GET_REVIEWS_REQUEST,GET_REVIEWS_SUCCESS,CLEAR_REVIEWS, ADD_PRODUCT,
    DELETE_COMMENT_SUCCESS,
    ADD_SALE,
    DELETE_SALE} from "../Constants/productConstants"

function getProductsReducer(state={products:[]},action){
    switch(action.type){
        case LIST_PRODUCTS_REQUEST :
            return { ...state , loading:true }
        case LIST_PRODUCTS_SUCCESS :
            return { loading:false , topRated: action.payload }    
        case LIST_PRODUCTS_FAIL :
            return {loading:false , error: action.payload}
        case DELETE_PRODUCTS :
            return {loading:false, products:state.products.filter(product => {return product._id != action.payload})}
        default :
            return state;        
    }
}

function getAllProductsReducer(state={products:[]},action){
    switch(action.type){
        case GET_ALL_PRODUCTS_REQUEST :
            return { ...state , loading:true }
        case GET_ALL_PRODUCTS_SUCCESS :
            return { loading:false , products: action.payload }    
        case GET_ALL_PRODUCTS_FAIL :
            return {loading:false , error: action.payload}
        case ADD_PRODUCT : 
            return {products:[action.payload,...state.products]}
        case ADD_SALE: 
            return {products:state.products.map(e => {
                if(e._id == action.payload.id){
                    e.onSale = true
                    e.sale = {
                        salePercentage:action.payload.salePercentage,
                        salePrice: e.price - (e.price * (action.payload.salePercentage/100)) ,
                        endDate:action.payload.endDate,
                    }
                    return e
                }else{
                    return e
                }
            })}
        case DELETE_SALE: 
            return {products:state.products.map(e => {
                if(e._id == action.payload.id){
                    e.onSale = false
                    e.sale = null
                    return e
                }else{
                    return e
                }
            })}
        case UPDATE_PRODUCT :
            const filter = state.products.filter(e => e._id != action.payload._id) 
            return {products:[action.payload,...filter]}
        case DELETE_PRODUCTS :
            return {loading:false, products:state.products.filter(product => {return product._id != action.payload})}
        default :
            return state;        
    }
}

function addProductReducer(state={},action){
    switch(action.type){
        case ADD_PRODUCTS_REQUEST:
            return{loading:true}
        case ADD_PRODUCTS_SUCCESS :
            return{loading:false, addedProduct:action.payload}
        case ADD_PRODUCTS_FAIL :
            return {loading:false, error:action.payload}
        case CLEAR_ADD_PRODUCT:
            return {};    
        default:
            return state;            
    }
}

function updateProductReducer(state={},action){
    switch(action.type){
        case UPDATE_PRODUCTS_REQUEST:
            return{updateLoading:true}
        case UPDATE_PRODUCTS_SUCCESS :
            return{updateLoading:false, updatedProduct:action.payload}
        case UPDATE_PRODUCTS_FAIL :
            return {updateLoading:false, updateError:action.payload}
        default:
            return state;            
    }
}

function getProductDetailsReducer(state={},action){
    switch(action.type){
        case GET_PRODUCT_DETAILS_REQUEST:
            return{loading:true}
        case GET_PRODUCT_DETAILS_SUCCESS :
            return{loading:false, product:action.payload}
        case GET_PRODUCT_DETAILS_FAIL :
            return {loading:false, error:action.payload}
        default:
            return state;            
    }
}

function getProductCategoryReducer(state={},action){
    switch(action.type){
        case LIST_CATEGORY_REQUEST:
            return{loading:true}
        case LIST_CATEGORY_SUCCESS :
            return{loading:false, products:action.payload}
        case LIST_CATEGORY_FAIL :
            return {loading:false, error:action.payload}
        default:
            return state;            
    }
}

function getInfoReducer(state={},action){
    switch(action.type){
        case GET_INFO_REQUEST:
            return{loading:true}
        case GET_INFO_SUCCESS :
            return{loading:false, info:action.payload}
        case GET_PRODUCT_DETAILS_FAIL :
            return {loading:false, error:action.payload}
        case CLEAR_INFO:
            return {}    
        default:
            return state;            
    }
}

function getReviewsResucer(state={},action){
    switch(action.type){
        case GET_REVIEWS_REQUEST:
            return{loading:true}
        case GET_REVIEWS_SUCCESS :
            return{loading:false, reviews:action.payload}
        case GET_REVIEWS_FAIL:
            return {loading:false, error:action.payload}
        case ADD_COMMENT:
            return{reviews:[...state.reviews,action.payload]}
        case DELETE_COMMENT_SUCCESS:
            const rev = state.reviews.find(e => e._id == action.payload)
            rev.comment = null
            return {reviews:[rev,...state.reviews.filter(e => e._id != action.payload)]}
        case CLEAR_REVIEWS:
            return {}    
        default:
            return state;            
    }
}

function filterProductsReducer(state={},action){
    switch(action.type){
        case GET_FILTERED_PRODUCTS_REQUEST:
            return{loading:true}
        case GET_FILTERED_PRODUCTS_SUCCESS :
            return{loading:false, filter:action.payload}
        case GET_FILTERED_PRODUCTS_FAIL :
            return {loading:false, error:action.payload}
        case CLEAR_FILTER_PRODUCTS:
            return {}    
        default:
            return state;            
    }
}

function searchProductsReducer(state={},action){
    switch(action.type){
        case GET_SEARCH_REQUEST:
            return{loading:true}
        case GET_SEARCH_SUCCESS :
            return{loading:false, search:action.payload}
        case GET_SEARCH_FAIL :
            return {loading:false, error:action.payload}
        case CLEAR_SEARCH:
            return {}    
        default:
            return state;            
    }
}

function addReviewReducer(state={},action){
    switch(action.type){
        case ADD_COMMENT_REQUEST:
            return{loading:true}
        case ADD_COMMENT_SUCCESS :
            return{loading:false, review:action.payload}
        case ADD_COMMENT_FAIL :
            return {loading:false, error:action.payload}
        case CLEAR_ADD_COMMENT:
            return {}    
        default:
            return state;            
    }
}

function addSaleReducer(state={},action){
    switch(action.type){
        case ADD_SALE_REQUEST:
            return{saleLoading:true}
        case ADD_SALE_SUCCESS :
            return{saleLoading:false, sale:action.payload}
        case ADD_SALE_FAIL :
            return {saleLoading:false, saleError:action.payload}
        case CLEAR_ADD_SALE:
            return {}    
        default:
            return state;            
    }
}

function deleteSaleReducer(state={},action){
    switch(action.type){
        case DELETE_SALE_REQUEST:
            return{delSaleLoading:true}
        case DELETE_SALE_SUCCESS :
            return{delSaleLoading:false, delSale:action.payload}
        case DELETE_SALE_FAIL :
            return {delSaleLoading:false, delSaleError:action.payload}
        case CLEAR_DELETE_SALE:
            return {}    
        default:
            return state;            
    }
}

export {getProductsReducer,addProductReducer,getAllProductsReducer
    ,getProductDetailsReducer,updateProductReducer,getReviewsResucer
    ,getProductCategoryReducer,getInfoReducer,filterProductsReducer
    ,searchProductsReducer,addReviewReducer,addSaleReducer,deleteSaleReducer}