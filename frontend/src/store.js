import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import Cookie from "js-cookie"
import {userSignReducer,userDetailsReducer,getUsersReducer,updateProfileReducer
  ,registerUserReducer,updateImageReducer, changepasswordReducer} from "./reducers/userReducer"
import {ShippingReducer} from "./reducers/shippingReducer"
import {getProductsReducer,addProductReducer,getProductDetailsReducer
      ,updateProductReducer,getProductCategoryReducer,getInfoReducer
      ,filterProductsReducer,searchProductsReducer,getAllProductsReducer
      ,addReviewReducer,addSaleReducer,deleteSaleReducer,getReviewsResucer} from "./reducers/productReducer"
import {sidebarReducer} from "./reducers/sidebarReducer"
import {getWishListReducer,clearWishListReducer} from "./reducers/wishlistReducer"
import {cartReducr} from "./reducers/cartReducer"
import {makeOrderReducer,getOrdersReducer,getOrderDetailssReducer
        ,getAllOrdersReducer,deliverOrderReducer} from "./reducers/orderReducer"

import {getQuestionsReducer,addQuestionReducer} from './reducers/QuestionsReducer'


const userData = Cookie.getJSON("userInfo")
let cartItems;
let initialOrder;
let shippingInfo;
if(userData){
   cartItems = localStorage.getItem(`${userData.userName}cartItems`) ? JSON.parse(localStorage.getItem(`${userData.userName}cartItems`)) : [];
   initialOrder = localStorage.getItem(`${userData.userName} initailOrder`) ? JSON.parse(localStorage.getItem(`${userData.userName} initailOrder`)) : [];
  // shippingInfo = localStorage.getItem(`${userData.userID}shippingInfo`) ? JSON.parse(localStorage.getItem("shippingInfo")):[]
}
const initaialState = {cart:{cartItems}, userSignIn:{userData},order:{initialOrder}}

const reducer = combineReducers({
    userSignIn : userSignReducer,
    listProducts : getProductsReducer,
    allProducts: getAllProductsReducer,
    addProduct : addProductReducer,
    sidebarComponent: sidebarReducer,
    userDetails: userDetailsReducer,
    usersList: getUsersReducer,
    updateUser: updateProfileReducer,
    shipping: ShippingReducer,
    wishlist: getWishListReducer,
    cart: cartReducr,
    order: makeOrderReducer,
    getOrders: getOrdersReducer,
    orderDetails: getOrderDetailssReducer,
    allOrders: getAllOrdersReducer,
    productDetails: getProductDetailsReducer,
    updateProducts: updateProductReducer,
    registerUser:registerUserReducer,
    productsCategory: getProductCategoryReducer,
    clearWhishlist:clearWishListReducer,
    filterInfo:getInfoReducer,
    filterProducts: filterProductsReducer,
    searchResult:searchProductsReducer,
    updateImage: updateImageReducer,
    addReview:addReviewReducer,
    addSale:addSaleReducer,
    deleteSale:deleteSaleReducer,
    deliverOrder:deliverOrderReducer,
    getQuestions:getQuestionsReducer,
    addQuestion:addQuestionReducer,
    changePassword:changepasswordReducer,
    getReviews:getReviewsResucer,
})

const store = createStore(reducer, initaialState, applyMiddleware(thunk))

export default store;