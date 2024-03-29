
import React from 'react'
import { useState } from 'react'
import cross from '../../assets/icons/cross.png'
import createToaste from '../../Pages/utility/toastMessage'
import { useDispatch } from 'react-redux';
import { userRegister } from '../../redux/auth/authAction';
import { useNavigate } from 'react-router-dom';
import ToolTip from '../ToolTip/ToolTip';

// get fb date
const day = [1,2,3,4,5,6,7,8,9,10,
  11,12,13,14,15,16,17,18,19,20,
  21,22,23,24,25,26,27,28,29,30,31
]

// get fb months
const month = [
  "Jan", 
  "Feb", 
  "Mar", 
  "apr", 
  "May",  
  "Jun", 
  "Jul", 
  "Aug", 
  "Sep", 
  "Oct", 
  "Nov", 
  "Dec"
]



// get fb years
const years = Array.from(
  { length : 118 },
  (_, i) => new Date().getFullYear() - i
)



const Register = ({setRegister}) => {

  
  const navigate = useNavigate();
  const  dispatch  = useDispatch();

  const [tolTip, setTolTip] = useState({});
  
  const [fieldEdit, setFieldEdit] = useState({})


  // get year info
  const date = new Date();

  // set input in form data
  const [input, setInput] = useState({
    fname : '',
    sname : '',
    auth : '',
    password : '',
    day : date.getDate(),
    month : month[date.getMonth()],
    year : date.getFullYear(),
    gender : ''
  });


  // set validate in input fields
  const [validate, setValidate] = useState({
    fname : false,
    sname : false,
    auth : false,
    password : false
  });

  // distructure from input
  const { fname, sname, auth, password, gender } = input;

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
  setTolTip((prevState) => ( {
    ...prevState,
    [fieldName] : false
   }))
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

 // handle validate change focus border
 const handleValidateChangeFocus = (e) => {
  const fieldName = e.target.name;
  
  setValidate( (prevState) => ( {
    ...prevState,
    [fieldName] : false
  }));
  setFieldEdit((prevState) => ( {
    ...prevState,
    [fieldName] : true
   }))
   if(e.target.value){
    setTolTip((prevState) => ( {
      ...prevState,
      [fieldName] : false
     }))
   }else{
    setTolTip((prevState) => ( {
      ...prevState,
      [fieldName] : true
     }))
   }
  };
 
  // submit form

  const handleSubmitForm = (e) => {
   e.preventDefault();
   
   // check validate
   if( !fname ||
       !sname || 
       !auth || 
       !password ||  
       !gender){
    
        createToaste('All fields are required !', 'error')
   }else {
     dispatch(userRegister({
      first_name : fname,
      sur_name : sname,
      auth : auth,
      password : password,
      gender : gender,
      birth_date : input.day,
      birth_month : input.month,
      birth_year : input.year
     },
     setInput,
     e,
     setRegister,
     navigate
     ))
   }
  }

  // handle 


 
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
          <form onSubmit={ handleSubmitForm }>
            <div className="reg-form reg-form-inline">
               {
                tolTip.fname && fieldEdit.fname && <ToolTip data={'First Name'}/>
               }
                
              
              <input type="text" placeholder="First Name" 
              className={validate.fname && 'error-border'}
              name='fname'
              value={fname}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              onFocus={handleValidateChangeFocus}
              />
               {                                                       // tool tip class name
                tolTip.sname && fieldEdit.sname && <ToolTip data={'Sur Name'} surname={true} reactingle={true}/>
               }
              <input type="text" placeholder="Surname" 
              className={validate.sname && 'error-border'}
              name='sname'
              value={sname}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              onFocus={handleValidateChangeFocus}
              />
              
            </div>
            <div className="reg-form">
              {                                                                   // tool tip class name
                tolTip.auth && fieldEdit.auth && <ToolTip data={'Email or Phone'} pwword={true}/>
               }
              <input type="text" placeholder="Mobile number or email address" 
              className={validate.auth && 'error-border'}
              name='auth'
              value={auth}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              onFocus={handleValidateChangeFocus}
              />
            </div>
            <div className="reg-form">
               {
                tolTip.password && fieldEdit.password && <ToolTip data={'Password'} pwword={true}/>
               }
              <input type="password" placeholder="New password" 
              className={validate.password && 'error-border'}
              name='password'
              value={password}
              onChange={handleGetformData}
              onBlur={handleValidateChange}
              onFocus={handleValidateChangeFocus}
              />
            </div>
            <div className="reg-form">
              <span>Date of birth</span>
              <div className="reg-form-select">
                <select name="day" id="" onChange={handleGetformData}>
                {
                   day.map((item, index) => 
                     <option selected={item === input.day ? true : false} value={item} key={index}>{item}</option>
                    )
                  }
                </select>
                <select name="month" id="" onChange={handleGetformData}>
                  {
                   month.map((item, index) => 
                     
                     <option selected={item === input.month ? true : false} value={item} key={index}>{item}</option>
                    )
                  }
                  
                </select>
                <select name="year" id="" onChange={handleGetformData}>
                {
                   years.map((item, index) => 
                     <option selected={item === input.year ? true : false} value={item} key={index}>{item}</option>
                    )
                  }
                </select>
              </div>
            </div>

            <div className="reg-form">
              <span>Gender</span>
              <div className="reg-form-select">
                <label>
                  Female
                  <input type="radio" name="gender" value="Female" onChange={handleGetformData}/>
                </label>
                <label>
                  Male
                  <input type="radio" name="gender" value="Male" onChange={handleGetformData}/>
                </label>
                <label>
                  Custom
                  <input type="radio" name="gender"  value="Custom" onChange={handleGetformData}/>
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