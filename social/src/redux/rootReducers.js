
// create root 

import { combineReducers } from "redux";
import authReducer from "./auth/authReduce";
import toastReducer from "./toast/toastReducer";
import { loaderReducer } from "./top-loader/loaderReducer";

const rootReducers = combineReducers({
   auth : authReducer,
   toast : toastReducer,
   loader : loaderReducer
});

// export rootReducers
export default rootReducers;