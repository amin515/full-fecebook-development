
// create root 

import { combineReducers } from "redux";
import authReducer from "./auth/authReduce";
import toastReducer from "./toast/toastReducer";

const rootReducers = combineReducers({
   auth : authReducer,
   toast : toastReducer
});

// export rootReducers
export default rootReducers;