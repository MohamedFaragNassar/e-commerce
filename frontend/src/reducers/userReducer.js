import {USER_LOGOUT, USER_REGISTER_SUCCESS,USER_REGISTER_FAIL
        ,USER_SIGNIN_FAIL,USER_SIGNIN_SUCCESS,USER_UPDATE_FAIL,USER_UPDATE_SUCCESS} from "../Constants/userConstants"

function userSignReducer(state={},action){
    switch(action.type){
        case USER_SIGNIN_SUCCESS:
            return {user:action.payload}
        case USER_SIGNIN_FAIL:
            return {error:action.payload}
        default :
            return state;        
    }
}

export {userSignReducer}