
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { changePassword } from '../../redux/auth/authAction';
import Cookies from 'js-cookie';





const Password = () => {
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();



  // handle change password
  const handleChangePassword = (e) => {
   e.preventDefault();

   dispatch(changePassword({
      id : Cookies.get('cpid'),
      code : Cookies.get('cpcode'),
      password : password
   }, navigate))
  }
  return (
    <>
      {/* <!-- reset Box  --> */}
    <div className="reset-area">
      <div className="reset-wraper">
        <div className="reset-box">
          <div className="reset-box-header">
            <span className="title">Choose a new password</span>
          </div>
          <div className="reset-body">
            <p>
              Create a new password that is at least 6 characters long. A strong
              password has a combination of letters, digits and punctuation
              marks.
            </p>
            <div className="code-box">
              <input className="w-100" type="text" placeholder="New password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
            </div>
          </div>
          <div className="reset-footer">
            <a href="#"></a>
            <div className="reset-btns">
              <Link className="cancel" to="/login">Skip</Link>
              <a onClick={handleChangePassword} className="continue" href="#">Continue</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Password