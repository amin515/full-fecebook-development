
import React from 'react'
import { useState } from 'react'
import cross from '../../assets/icons/cross.png'
const Register = ({setRegister}) => {
  
  // set input in form data
  const [input, setInput] = useState({
    fname : '',
    sname : '',
    emailOrPhone : '',
    password : ''
  });


  // set validate in input fields
  const [validate, setValidate] = useState({
    fname : false,
    sname : false,
    emailOrPhone : false,
    password : false
  });

  // distructure from input
  const { fname, sname, emailOrPhone, password } = input;

  // get data from form
 const handleGetformData = (e) => {
  setInput((prevState) => ( {
    ...prevState,
    [e.target.name] : e.target.value
  } ))
 }

 // handle validate change
 const handleValidateChange = (e) => {
  const fieldName = e.target.name;
  
  if( !input[fieldName] ){
    setValidate( (prevState) => ( {
      ...prevState,
      [fieldName] : true
    }));
  }else{
    setValidate( (prevState) => ( {
      ...prevState,
      [fieldName] : false
    }));
  };
 };

 
  return (
    <div className="blur-box">
      <div className="sign-up-card">
        <div className="sign-up-header">
          <div className="sign-up-content">
            <span>Sign Up</span>    
            <span>It's quick and easy.</span>
          </div>
          <button onClick={() => setRegister(false)}>
            <img src={cross} alt="" />
          </button>
        </div>
        <div className="sign-up-body">
          <form action="">
            <div className="reg-form reg-form-inline">
              <input type="text" placeholder="First Name" 
              className={validate.fname && 'error-border'}
              name='fname'
              value={fname}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              />
              
              <input type="text" placeholder="Surname" 
              className={validate.sname && 'error-border'}
              name='sname'
              value={sname}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              
              />
              
            </div>
            <div className="reg-form">
              <input type="text" placeholder="Mobile number or email address" 
              className={validate.emailOrPhone && 'error-border'}
              name='emailOrPhone'
              value={emailOrPhone}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              />
            </div>
            <div className="reg-form">
              <input type="text" placeholder="New password" 
              className={validate.password && 'error-border'}
              name='password'
              value={password}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              />
            </div>
            <div className="reg-form">
              <span>Date of birth</span>
              <div className="reg-form-select">
                <select name="" id="">
                  <option value="">Day</option>
                </select>
                <select name="" id="">
                  <option value="">Month</option>
                </select>
                <select name="" id="">
                  <option value="">Year</option>
                </select>
              </div>
            </div>

            <div className="reg-form">
              <span>Gender</span>
              <div className="reg-form-select">
                <label>
                  Female
                  <input type="radio" name="gender" />
                </label>
                <label>
                  Male
                  <input type="radio" name="gender" />
                </label>
                <label>
                  Custom
                  <input type="radio" name="gender" />
                </label>
              </div>
            </div>

            <div className="reg-form">
              <p>
                People who use our service may have uploaded your contact
                information to Facebook. <a href="#">Learn more.</a>
              </p>
            </div>
            <div className="reg-form">
              <p>
                By clicking Sign Up, you agree to our <a href="#">Terms</a>,
                <a href="#">Privacy Policy</a> and
                <a href="#">Cookies Policy</a>. You may receive SMS
                notifications from us and can opt out at any time.
              </p>
            </div>

            <div className="reg-form">
              <button type='submit'>Sign Up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;