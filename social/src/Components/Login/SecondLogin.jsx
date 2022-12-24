
import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/auth/authAction';
import createToaste from '../../Pages/utility/toastMessage';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
const SecondLogin = ({setRegister}) => {
     
  // navigator
  const navigate = useNavigate();
  // dispatch redux function
  const dispatch = useDispatch()

  // user login state
  const [input, setinput] = useState({
    auth : '',
    password : ''
  });

  // handle input user
  const handleInputUser = (e) => {
    setinput((prevState) => ({
     ...prevState,
     [e.target.name] : e.target.value
    }))
  }
  // handle user login
  const handleUserLogin = (e) => {
   e.preventDefault();
   if(!input.auth || !input.password){
     createToaste('All fields are required', 'error')
   }else{
    dispatch(userLogin({
      auth : input.auth,
      password : input.password
     }, navigate))
   }
  }

  return (
    <>
    <Header />
    <div className="auth-box-two">
            <form onSubmit={handleUserLogin}>
              <div className="auth-form">
                <input
                  name='auth'
                  value={input.auth}
                  onChange={handleInputUser}
                  type="text"
                  placeholder="Email address or phone number"
                />
              </div>
              <div className="auth-form">
                <input
                name='password'
                value={input.password}
                onChange={handleInputUser}
                type="password" 
                placeholder="Password" />
              </div>
              <div className="auth-form">
                <button type="submit">Log In</button>
              </div>
            </form>

            <Link to="/forgot-password">Forgotten password?</Link>

            <div className="divider"></div>

            <button onClick={() => setRegister(true)}>
              Create New Account
              </button>
          </div>
          <Footer />
    </>
    
  )
}

export default SecondLogin;