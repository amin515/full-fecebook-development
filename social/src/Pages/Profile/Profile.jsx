import React from 'react'
import CreatePost from '../../Components/CreatePost/CreatePost';
import FbHeader from '../../Components/FB-TOP-HEADER/FbHeader';
import Footer from '../../Components/Footer/Footer';
import ProfileFriend from '../../Components/Profile/ProfileFriends/ProfileFriend';
import ProfileIntro from '../../Components/Profile/ProfileIntro/ProfileIntro';
import ProfilePhotos from '../../Components/Profile/ProfilePhotos/ProfilePhotos';
import ProfileContent from '../../Components/Profile_Content/ProfileContent';
import UserPost from '../../Components/UserPost/UserPost';




const Profile = () => {

return (
<>
  <FbHeader />
  <ProfileContent />
  <div className='fb-profile-body'>
    <div className="fb-body-wrapper">
      <div className="user-personal-personal-info">
        <ProfileIntro />
        <ProfilePhotos />
        <ProfileFriend />
      </div>
      <div className="fb-profile-post">
      <CreatePost />
       <UserPost/>
      </div>
    </div>
  </div> 
<Footer/>

  
</>
)
}

export default Profile;