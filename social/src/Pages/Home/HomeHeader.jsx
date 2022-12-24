import React from 'react'
import { useSelector } from 'react-redux';
import Avatar from '../../Components/Avatar/Avatar';


const HomeHeader = () => {

// use selector redux function
const { user } = useSelector(state => state.auth)

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
                      <span>Logout</span>
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