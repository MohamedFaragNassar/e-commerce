import Cookie from "js-cookie"
import Axios from "axios"
import {USER_LOGOUT, USER_REGISTER_SUCCESS,USER_REGISTER_FAIL
        ,USER_SIGNIN_FAIL,USER_SIGNIN_SUCCESS,USER_UPDATE_FAIL
        ,USER_UPDATE_SUCCESS} from "../Constants/userConstants"




const signin = (email,password) => async (dispatch) => {
    try{
        const { data } = await Axios.post("/users/signin",{email,password})
        dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
        Cookie.set("userData", JSON.stringify(data))
    }catch(error){
        dispatch({type:USER_SIGNIN_FAIL, payload: error})
    }
 }        

 export  {signin}