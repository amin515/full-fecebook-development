
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const RequestBox = ({ users, buttonStack }) => {
  const { user: loginUser } = useSelector((state) => state.auth);
  console.log(loginUser._id)
  // send friend request
  const handleSendFriendRequest = (receiverId) => {
    axios.get(`/api/v1/user/add-friends/${loginUser._id}/${receiverId}`);
    alert('hello')
  };

  return (
    <div className="friends_req_box">
      <div className="friends_req_img">
        <img
          src={
            users.profile_photo
              ? `/profile/${users.profile_photo}`
              : "https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png"
          }
          alt=""
        />
        <div className="friends_req_name">
          <p>
            {users.first_name} {users.sur_name}
          </p>
        </div>
      </div>
      <div className="mutual_item">
        <div className="mutual">
          <div className="mutual-box">
            <img
              src="https://scontent.fdac24-3.fna.fbcdn.net/v/t1.6435-1/101863146_543018396586241_4254563838647585887_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=3b5OyOzyq2QAX_jBb7O&_nc_ht=scontent.fdac24-3.fna&oh=00_AfBdIIV_qAC3dE3X_0ClWUW6U5JAI8AGPaTDNEiFQ-Dvlg&oe=643132A9"
              alt=""
            />
            <img
              src="https://scontent.fdac24-3.fna.fbcdn.net/v/t1.6435-1/101863146_543018396586241_4254563838647585887_n.jpg?stp=dst-jpg_p240x240&_nc_cat=104&ccb=1-7&_nc_sid=7206a8&_nc_ohc=3b5OyOzyq2QAX_jBb7O&_nc_ht=scontent.fdac24-3.fna&oh=00_AfBdIIV_qAC3dE3X_0ClWUW6U5JAI8AGPaTDNEiFQ-Dvlg&oe=643132A9"
              alt=""
            />
          </div>
          <div className="span">12 mutual friends</div>
        </div>
        <div className="friends_confirm_btns">
          {buttonStack === "request" && (
            <>
              <button className="blue">Confirm</button>
              <button>Delete</button>
            </>
          )}

          {buttonStack === "suggest" && (
            <>
              {" "}
              <button
                className="add_friends"
                onClick={() => handleSendFriendRequest(users._id)}
              >
                Add friends
              </button>
              <button>Remove</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestBox;
