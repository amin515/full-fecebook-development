
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { findAccount } from '../../redux/auth/authAction';
import createToaste from '../utility/toastMessage';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const Forgot = () => {

    const dispatch = useDispatch()
    const  navigate  = useNavigate()
    const [auth, setAuth] = useState("")

    // input change handler
    const handleChangeInput = (e) => {
      setAuth(e.target.value)
    }

    // handle submit data
  const handleSubmitUser = (e) => {
    if(!auth){
        createToaste('Input field are required', "warn")
    }
    if(auth){
      dispatch(findAccount({
        auth
      }, navigate))
    }
  }
    


return (


<>
    <Header />
        <div className="reset-area">
            <div className="reset-wraper">
                <div className="reset-box">
                    <div className="reset-box-header">
                        <span className="title">Find Your Account</span>
                    </div>
                    <div className="reset-body">
                        <p>
                            Please enter your email address or mobile number to search for
                            your account.
                        </p>
                        <div className="code-box">
                            <input className="w-100" type="text" name='auth' value={auth} onChange={handleChangeInput} placeholder="Email address or mobile number" />
                        </div>
                    </div>
                    <div className="reset-footer">
                        <a href="#"></a>
                        <div className="reset-btns">
                            <Link className="cancel" to="/login">Cancel</Link>
                            <a onClick={handleSubmitUser} className="continue" type='submit'>Search</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <Footer />
</>
)
}

export default Forgot;