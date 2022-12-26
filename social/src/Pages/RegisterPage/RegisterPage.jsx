
import React, { useState } from 'react'
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import FacebookLogo from '../../assets/icons/facebook.svg';
import Register from '../../Components/Register/Register';
const RegisterPage = () => {
    
  const [register, setRegister] = useState(false);
  return (
    <>
    <Header />
        <div>
        <div className="fb-auth">
        <div style={{width : "auto"}} className="auth-wraper">
            <div style={{textAlign: "center"}} className="auth-right">
            <img style={{width: "200px"}} src={FacebookLogo} alt="" />
            <Register setRegister={setRegister}/>
            <p>
                <a href="#">Create a Page</a> for a celebrity, brand or business.
            </p>
            </div>
            </div>
          </div> 
        </div>
        <Footer />
        </>
  )
}

export default RegisterPage;