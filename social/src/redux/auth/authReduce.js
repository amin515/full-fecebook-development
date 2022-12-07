
/**
 * create auth reducer
 * 
 */

import initialState from "./initialState";

const authReducer = (state = initialState, {type, payload}) => {

    switch (type) {
        case '':
            
            break;
    
        default:
            return state;
    }

}
//export authReducer
export default authReducer;