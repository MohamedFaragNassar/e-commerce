import {ADD_CART_PRODUCT,DELETE_CART_PRODUCT, UPDATE_CART_PRODUCT,GET_CART_PRODUCT} from "../Constants/cartConstants"

const cartReducr = (state={cartItems:[]},action)=>{
    switch(action.type){
        case GET_CART_PRODUCT:
            return{cartItems:action.payload}
        case ADD_CART_PRODUCT:
            const product = action.payload;
            const isItemExist = state.cartItems?.find(item=> item.product === product.product)
            if (isItemExist){
                return {...state}
            }
            else{
                const items = state.cartItems ? [...state.cartItems,product] : [product]
                return {...state,cartItems:items}
            }
        case DELETE_CART_PRODUCT:
           return {...state, cartItems: [...state.cartItems.filter(item => {return item.product !== action.payload})]}   
        case UPDATE_CART_PRODUCT:
            function changeQty( id, qty ) {
                for (var i in state.cartItems) {
                  if (state.cartItems[i].product == id) {
                    state.cartItems[i].qty = Number(qty);
                     break; 
                  }
                }
             }
             changeQty(action.payload.id,action.payload.qty)
            return {...state,cartItems:[...state.cartItems]}
        default :
                return state    
    }
}

export {cartReducr}