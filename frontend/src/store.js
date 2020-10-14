import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import Cookie from "js-cookie"
import {userSignReducer} from "./reducers/userReducer"

const userData = Cookie.getJSON("userData") || null

const initaialState = {cart:{} , userSignIn:{userData}}

const reducer = combineReducers({
    userSign : userSignReducer,
})

const store = createStore(userSignReducer, initaialState, applyMiddleware(thunk))

export default store;