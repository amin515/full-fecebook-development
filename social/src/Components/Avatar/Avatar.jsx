
import React from 'react';
import { useSelector } from 'react-redux';

const Avatar = () => {
const { user } = useSelector(state => state.auth)
  return (
    <>
    <img src={user.profile_photo ? `/profile/${user.profile_photo}` : 'https://w7.pngwing.com/pngs/613/636/png-transparent-computer-icons-user-profile-male-avatar-avatar-heroes-logo-black-thumbnail.png'} alt="" />
    </>
  )
}

export default Avatar;