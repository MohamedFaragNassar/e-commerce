import {ADD_CART_PRODUCT,DELETE_CART_PRODUCT,UPDATE_CART_PRODUCT,GET_CART_PRODUCT} from "../Constants/cartConstants"

const addToCart = (product) => (dispach,getState) =>{
       const {userSignIn:{userData}} = getState();
       const price = product.onSale? product.sale.salePrice:product.price;
       
       dispach({type:ADD_CART_PRODUCT, payload:{
                name: product.productName,
                price,
                image: product.mainImage,
                product: product._id,
                amount: product.amount,
                qty: 1,
            }})
        if(userData){
            localStorage.setItem(`${userData.userName}cartItems`,JSON.stringify(getState().cart.cartItems))
        }else{
            localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
        }
}

const removeFromCart = (id) => (dispach,getState) =>{
    const {userSignIn:{userData}} = getState();
    dispach({type: DELETE_CART_PRODUCT, payload:id});
    if(userData){
        localStorage.setItem(`${userData.userName}cartItems`,JSON.stringify(getState().cart.cartItems))
     }else{
        localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems))
     }
}

const updateCart = (id,qty) => (dispach,getState) => {
    const {userSignIn:{userData}} = getState();
    dispach({type: UPDATE_CART_PRODUCT, payload:{id,qty}});
    localStorage.setItem(`${userData.userName}cartItems`,JSON.stringify(getState().cart.cartItems))
}

const getCartItems = ()=>(dispach,getState)=>{
    const {userSignIn:{userData}} = getState();
    let items;
    if(userData){
        items = localStorage.getItem(`${userData.userName}cartItems`) ? JSON.parse(localStorage.getItem(`${userData.userName}cartItems`)) : [];
    }else{
        items = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
    }
    dispach({type:GET_CART_PRODUCT,payload:items})
}

export {addToCart, removeFromCart,updateCart,getCartItems}