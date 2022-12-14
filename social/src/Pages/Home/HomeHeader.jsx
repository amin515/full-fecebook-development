import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../Components/Avatar/Avatar';
import { userLogout } from '../../redux/auth/authAction';


const HomeHeader = () => {

// use selector redux function
const { user } = useSelector(state => state.auth);

const dispatch = useDispatch();
const navigate = useNavigate()

// handle logout user
const handleLogoutUser = (e) => {
  e.preventDefault();
  dispatch(userLogout(navigate))
}
  return (

  <>
    <div className="user-menu-dropdown">
            <div className="user-menu-box">
              <div className="user-data-box">
                <div className="user-data-box-item">
                  <Avatar />
                  <span>{`${user.first_name} ${user.sur_name}`}</span>
                </div>
                <div className="divider-0"></div>
                <a href="#">See all profiles</a>
              </div>
            </div>
            <div className="user-menu-list">
              <ul>
                <li>
                  <a href="#">
                    <div className="user-menu-icon"></div>
                    <div className="user-menu-item">
                      <span>Settings & privacy</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="user-menu-icon"></div>
                    <div className="user-menu-item">
                      <span>Help & support</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="user-menu-icon"></div>
                    <div className="user-menu-item">
                      <span>Display & accessibility</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="user-menu-icon"></div>
                    <div className="user-menu-item">
                      <span>Give feedback</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div className="user-menu-icon"></div>
                    <div className="user-menu-item">
                      <span onClick={handleLogoutUser}>Logout</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
  </>
  )
}

export default HomeHeader