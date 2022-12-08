
// create user register

import axios from 'axios';
import createToaste from '../../Pages/utility/toastMessage';
import { REGISTER_FAILED, REGISTER_REQUEST, REGISTER_SUCCESS } from './actionType';

export const userRegister = (data, setInput, e, setRegister ) =>async(dispatch) => {
  
  try {

    // register request
    dispatch({
        type : REGISTER_REQUEST
    })

   await axios.post('/api/v1/user/register', data)
   .then( res => {
    createToaste('User Register successful', "success")
    // register success
    dispatch({
        type : REGISTER_SUCCESS,
        payload : res.data.message
    })
    // clear input fields
    setInput({
        fname : '',
        sname : '',
        emailOrPhone : '',
        password : '',
        day : '',
        month : '',
        year : '',
        gender : ''
    })
    // reset form
    e.target.reset()
    // register modal disapier
    setRegister(false)
   })
   .catch(err => {
    createToaste(err.response.data.message, "error")

    dispatch({
        type : REGISTER_FAILED,
        payload : err.response.data
    })
   });
  } catch (error) {
    createToaste(error.response.data.message, "error")
    dispatch({
        type : REGISTER_FAILED,
        payload : error.response.data
    })
  }

}