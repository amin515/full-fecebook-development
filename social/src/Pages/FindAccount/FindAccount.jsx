
import React from 'react'
import Footer from '../../Components/Footer/Footer'
import Header from '../../Components/Header/Header'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cookie from 'js-cookie';
import { useEffect } from 'react'
import { hideMobileOrEmail } from '../utility/helper'
import axios from 'axios'
import createToaste from '../utility/toastMessage'





const FindAccount = () => {

  // find user data state
  const [findUser, setFindUser] = useState({
    name : '',
    email : '',
    cell : '',
    photo : ''
  })

  // get name & email, photo, cell from cookies
  // const getUser = JSON.parse(Cookie.get('findAccount')) ?? null;

  const navigate = useNavigate()
  let getUser = JSON.parse(Cookie.get('findAccount'))  ?? null
 
  

  // handle not you
  const handleNotYou = (e) => {
    e.preventDefault();
    Cookie.remove('findAccount')
    navigate('/forgot-password')
  }

  // update input fields data
  useEffect(() => {
    if(getUser){
     setFindUser({
       name : getUser.name,
       email : getUser.email ?? null,
       cell : getUser.cell ?? null,
       photo : getUser.photo
     })
    }
 }, []);

 // handle continue by you
 const handleContinueByYou = async (e) => {
   e.preventDefault();
   
    await axios.post('/api/v1/user/send-password-link-otp', {
      auth : findUser.email ?? findUser.cell
    })
    .then( res => {
      createToaste(res.data.message, 'success');
      navigate('/authentic/reset-pass')
    })
    .catch( err => {
      createToaste(err.response.data.message)
    })
 }

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
            <img src={getUser.photo ? getUser.photo : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr-oj9tKyBGfcnqrFVVjoXWy1TuO8QC52nUg&usqp=CAU' } alt="" />
            
              <span>{getUser.name}</span>
              {findUser.email && <p>Email : {hideMobileOrEmail(findUser.email)}</p>}
              {findUser.cell && <p>Mobile : {hideMobileOrEmail(findUser.cell)}</p>}
              
              <p>To reset your account password, please continue</p>
            </div>
          </div>
          <div class="reset-footer">
            <a href="#"></a>
            <div class="reset-btns">
              <a onClick={handleNotYou} class="cancel" href="#">Not you ?</a>
              <a class="continue" href="#" onClick={handleContinueByYou}>Continue</a>
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
