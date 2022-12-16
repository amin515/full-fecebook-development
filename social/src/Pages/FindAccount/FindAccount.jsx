
import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import user from '../../assets/images/user.png'
import { Link } from 'react-router-dom'
const FindAccount = () => {
  return (
    <>
    <Header />
     <div class="reset-area">
      <div class="reset-wraper">
        <div class="reset-box">
          <div class="reset-box-header">
            <span class="title">Reset your password</span>
          </div>
          <div class="reset-body">
            <div class="find-user-account">
            <img src={ user } alt="" />
              <span>Asraful Haque</span>
              <p>To reset your account password, please continue</p>
            </div>
          </div>
          <div class="reset-footer">
            <a href="#"></a>
            <div class="reset-btns">
              <Link class="cancel" to="/forgot-password">Not you ?</Link>
              <a class="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default FindAccount
