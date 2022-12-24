import {
    initialStateLoader
} from "./loaderInitial";
import {
    LOADER_END,
    LOADER_START
} from "./loaderType";

export const loaderReducer = (state = initialStateLoader, {type, payload}) => {
   switch (type) {
    case LOADER_START:
        return 100;
    case LOADER_END : 
     return 0;
   
    default:
        return state;
   }
}