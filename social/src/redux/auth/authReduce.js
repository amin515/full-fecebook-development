
/**
 * create auth reducer
 * 
 */

import { LOGIN_FAILED, LOGIN_SUCCESS, REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS, TOKEN_USER_FAILED, TOKEN_USER_SUCCESS } from "./actionType.js";
import initialState from "./initialState";

const authReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading : true
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading : false,
                message : payload
            }
        case REGISTER_FAILED:
            return {
                ...state,
                loading : false,
                message : payload
            }
        case LOGIN_FAILED:
            return {
                ...state,
                loginState : false,
                user : null
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loginState : true,
                user : payload,
                loading :false
            }

            case TOKEN_USER_SUCCESS:
            return {
                ...state,
                loginState : true,
                user : payload,
            }

            case TOKEN_USER_FAILED:
            return {
                ...state,
                loginState : false,
                user : null,
            }
           
    
        default:
            return state;
    }

}
//export authReducer
export default authReducer;