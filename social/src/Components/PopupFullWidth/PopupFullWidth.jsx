
import React, { useRef } from 'react';
import './PopupFullWidth.css';
import cross from '../../assets/icons/cross.png'
import UserDropMenu from '../UserDropMenu/UserDropMenu';
import { useState } from 'react';
const PopupFullWidth = ({ hide, children}) => {
    
  const [userMenu, setUserMenu] = useState(false);
  const useMenu = useRef(null);
  return (
    <div className='popup-full-wrapper'>
        <div className="popupfull-close">
          <div className="popup-wrapper-left">
          <button onClick={() => hide(false)}>
            <img src={cross} alt="" />
         </button>
        <div className="profile-popup-fb-logo">
        <a href="#"><img src="	http://localhost:3000/static/media/favicon.2cc2f9be6054aed5d843.ico
        " alt="" /></a>
        </div>
          </div>
          <div className="popup-wrapper-right">
          <UserDropMenu userMenu={userMenu} setUserMenu={setUserMenu} useMenu={useMenu}/>
          </div>
        </div>
       {children}
    </div>
  )
}

export default PopupFullWidth;