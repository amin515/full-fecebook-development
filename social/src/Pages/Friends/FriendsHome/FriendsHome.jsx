import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllUser } from "../../../redux/auth/authAction";
import RequestBox from "../FriendsMenu/RequestBox/RequestBox";

import "./FriendsHome.css";
const FriendsHome = () => {
  const { users, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser(user._id));
  }, [getAllUser]);

  return (
    <div className="frineds_home_container">
      <div className="friends_home_wrapper">
        <div className="friends_req_container">
          <div className="friends_req_header">
            <h3>Friends Request</h3>
            <button>See All</button>
          </div>

          <div className="friends_req_linked_area">
            {users.map((item, index) => {
              if (user.request.includes(item._id)) {
                return (
                  <Link to="" key={index}>
                    <RequestBox users={item} buttonStack="request"/>
                  </Link>
                );
              }
            })}
          </div>
        </div>

        <hr className="hr" />
        <div className="friends_req_container">
          <div className="friends_req_header">
            <h3>Peaple you may know</h3>
            <button>See All</button>
          </div>

          <div className="friends_req_linked_area">
            {users.map((item, index) => {
              if (
                !user.request.includes(item._id) &&
                !user.friends.includes(item._id)
              ) {
                return (
                  <Link to="" key={index}>
                    <RequestBox users={item} buttonStack="suggest"/>
                  </Link>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsHome;
