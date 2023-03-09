import React from "react";
import { Link } from "react-router-dom";
import "./FriendsMenu.css";
const FriendsMenu = () => {
  return (
    <div className="frineds_menu_container">
     <div className="friends_menu_item_box">
     <div className="friends_wrapper">
        <div className="friends_menu_box">
          <div className="friends_setting_box">
            <h4>Friends</h4>
            <span>
              <i class="bx bxs-cog"></i>
            </span>
          </div>
          <div className="friends_list_item">
            <ul>
              <li>
                <span className="menu_icon">
                  <i class="bx bxs-user-circle"></i>
                </span>
                <Link to="">Home</Link>
              </li>
              <li>
                <span className="menu_icon">
                  <i class="bx bxs-user-plus"></i>
                </span>
                <Link to="">Friends Request</Link>
              </li>
              <li>
                <span className="menu_icon">
                  <i class="bx bxs-user-detail"></i>
                </span>
                <Link to="">All Friends</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
     </div>
    </div>
  );
};

export default FriendsMenu;
