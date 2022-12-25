import React from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar';
import TimeLine from '../../Components/TimeLine/TimeLine';
import FbHeader from '../../Components/FB-TOP-HEADER/FbHeader';
import { useSelector } from 'react-redux';
import Auth from '../../Components/Auth/Auth';





const Home = () => {

  
  
  const {loginState} = useSelector(state => state.auth)
  console.log(loginState)
  return (
    
   <>
   {loginState ? <><FbHeader />
   <div className="fb-home-body">
     <Sidebar/>
     <TimeLine />
   </div></>  : <Auth />} 
   </>
  )
}

export default Home;

