import React from 'react'
import { useState } from 'react';
import '../../assets/css/style.css';
import FacebookLogo from '../../assets/icons/facebook.svg';
import Footer from '../../Components/Footer/Footer';
import Login from '../../Components/Login/Login';
import Register from '../../Components/Register/Register';

const Auth = () => {

  const [register, setRegister] = useState(false);

  return (
    <div>
      <div className="fb-auth">
      <div className="auth-wraper">
        <div className="auth-left">
          <img src={FacebookLogo} alt="" />
          <h2>
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        <div className="auth-right">
          <Login setRegister={setRegister}/>
          <p>
            <a href="#">Create a Page</a> for a celebrity, brand or business.
          </p>
        </div>
      </div>
    </div>


    <Footer />
     { register && <Register  setRegister={setRegister}/>}   
    </div>
  )
}

export default Auth;

