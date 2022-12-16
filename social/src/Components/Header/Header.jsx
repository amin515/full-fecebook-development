
import React from 'react'
import { Link } from 'react-router-dom'
import facebookLogo from '../../assets/icons/facebook.svg'
const Header = () => {
  return (
    <>
     {/* <!-- Facebook Auth Area --> */}
   <div class="reset-header">
      <div class="reset-header-wraper">
        <div class="reset-logo">
          <img src={facebookLogo} alt="" />
        </div>
        <div class="login-part">
          <input type="text" placeholder="Email or mobile number" />
          <input type="text" placeholder="Password" />
          <button>Log In</button>
          <Link to="/forgot-password">Forgotten account?</Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default Header