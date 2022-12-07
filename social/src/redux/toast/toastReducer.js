//init
const initialState = {
    msg : "",
    onload : false,
    type : 'error'
};


// create toast reducer
const toastReducer = (state = initialState, {type, payload}) => {
   switch (type) {
    case "":
        
        break;
   
    default:
        return state
   }
}

// exporting toatReducer //
export default toastReducer;