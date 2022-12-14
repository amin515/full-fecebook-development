
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Cookies from "js-cookie";
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import createToaste from '../utility/toastMessage';
import { 
  accountActivateByOtp, 
  checkResetPasswordOTP, 
  resendActivationLink 
} from '../../redux/auth/authAction';



const Authentication = () => {

  const {type} = useParams()


  // dispatch for account activate by otp

  const dispatch = useDispatch();
  // code state
  const [code, setCode] = useState('');
  // code update
  const handleGetCode = (e) => {
    setCode(e.target.value);
    
  }

 

    // navigate
    const navigate = useNavigate();
    // activation cookies
    const activateCookie = Cookies.get('otp');

    // activation cancell 
    const handleActivationCancel = (e) => {
      e.preventDefault();
      Cookies.remove('otp');
      navigate("/login")
    }
    


 // activate by code
 const handleActivateByCode = (e) => {

  if(!code){
    createToaste('OTP code is required !', "warn")
  }else{
   dispatch(accountActivateByOtp({
      code : code,
      email : Cookies.get('otp')
   },
   navigate))
    
  }
}

// resend link
const handleResendLink = (e) => {
  e.preventDefault();

  dispatch(resendActivationLink({
    email : activateCookie
  }, navigate))
}

// handle open reset password router

const handleResetPassword = (e) => {
  e.preventDefault();
 if(!code){
  createToaste('OTP is required', 'warn')
 }else{
  dispatch(checkResetPasswordOTP({
    code : code,
    auth : Cookies.get('otp')
 }, navigate))
 }
 
}

// if not valid activeCookies 
useEffect(() => {
  if(!activateCookie){
    navigate("/login")
  }
})

  return (
    <>
     
    <Header />

    {/* <!-- Facebook Auth Area --> */}
    
    {/* <!-- reset Box  --> */}
    <div class="reset-area">
      <div class="reset-wraper">
        <div class="reset-box">
          <div class="reset-box-header">
            <span class="title">Enter security code</span>
          </div>
          <div class="reset-body">
            <p>
              Please check your emails for a message with your code. Your code
              is 6 numbers long.
            </p>
            <div class="code-box">
              <input type="text" value={code} onChange={handleGetCode}/>
              <div class="code-text">
                <span>We sent your code to: </span>
                <span>{ activateCookie }</span>
              </div>
            </div>
          </div>
          <div class="reset-footer">
            <a onClick={handleResendLink} href="#">Didn't get a code?</a>
            <div class="reset-btns">
              <a onClick={handleActivationCancel} class="cancel" href="#">Cancel</a>
              <a onClick={type == 'account' ? handleActivateByCode : handleResetPassword } class="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default Authentication
