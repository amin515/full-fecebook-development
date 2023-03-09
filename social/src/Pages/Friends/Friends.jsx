import React from 'react'
import FbHeader from '../../Components/FB-TOP-HEADER/FbHeader';
import './Friends.css';
import FriendsHome from './FriendsHome/FriendsHome';
import FriendsMenu from './FriendsMenu/FriendsMenu';

const Friends = () => {
  return (
    <>
    <FbHeader />
     <div className="friends_full_container_area">
      <FriendsMenu />
      <FriendsHome />
     </div>
    </>
  )
}

export default Friends;