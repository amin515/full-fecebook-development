import React from 'react'
import CreatePost from '../../Components/CreatePost/CreatePost';
import FbHeader from '../../Components/FB-TOP-HEADER/FbHeader';
import FBCard from '../../Components/FBCard/FBCard';
import Footer from '../../Components/Footer/Footer';
import ProfileContent from '../../Components/Profile_Content/ProfileContent';
import UserPost from '../../Components/UserPost/UserPost';



const Profile = () => {

  const handle_view = () => {
    alert('Hello')
  }
return (
<>
  <FbHeader />
  <ProfileContent />
  <div className='fb-profile-body'>
    <div className="fb-body-wrapper">
      <div className="user-personal-personal-info">
        <FBCard>
         <div className="user-personal-info">
         <h3>Intro</h3>
         <div className="bio">
         <p>-Traveler of the time of infinity-</p>
         <a onClick={handle_view} className='personal-info-button'>Edit bio</a>
         </div>
         <div className="personal-info-details">
          <ul>
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
              <span>Profile - <strong> <span className="bio-editor">Digital Creator</span></strong></span>
            </li>
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yS/r/jV4o8nAgIEh.png" alt="" />
              <span>Founder of - <strong> <span className="bio-editor">Vlab</span></strong></span>
            </li>
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/y5/r/VMZOiSIJIwn.png" alt="" />
              <span>Lives in  - <strong> <span className="bio-editor">Bogra</span></strong></span>
            </li>
            <li>
              <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/S0aTxIHuoYO.png?_nc_eui2=AeFzJYivslVFpW9uL-fqmoNBrlG3yvH4CWGuUbfK8fgJYR7A7i2SO35IxndpZwoBYduuR_4QtpwzF53EDpJK3T8N" alt="" />
              <span><strong> <span className="bio-editor">Single</span></strong></span>
            </li>
          </ul>
         </div>
          <a className='personal-info-button'>Edit details</a>
         </div>
         <div className="hobbies">
          <div className="hobbie-list">
           <div className="hobbie-list-item">
          <img src="https://i.ibb.co/XFxYx23/earth.png" alt="earth" border="0"/>
            <p>Travelling</p>
           </div>
           <div className="hobbie-list-item">
          <img src="https://i.ibb.co/XFxYx23/earth.png" alt="earth" border="0"/>
            <p>Travelling</p>
           </div>
           <div className="hobbie-list-item">
          <img src="https://i.ibb.co/XFxYx23/earth.png" alt="earth" border="0"/>
            <p>Travelling</p>
           </div>
           <div className="hobbie-list-item">
          <img src="https://i.ibb.co/XFxYx23/earth.png" alt="earth" border="0"/>
            <p>Travelling</p>
           </div>
           <button>See All</button>
          </div>
          <a className='personal-info-button'>Edit hobies</a>
         </div>
         <div className="personal-features">
         <div className="profile-featured-content">
         <div className="profile-features-gallary">
            <div className="profile-features-item">
              <div style={{backgroundImage: 'url("https://dvvy6louqcr7j.cloudfront.net/vista/HO00013564/heroPoster/Avatar-The-Way-of-Water.png")'}} className="profile-featured-image"></div>
            </div>
            <span className="featured-item-count">+33</span>
          </div>
         <div className="profile-features-gallary">
            <div className="profile-features-item">
              <div style={{backgroundImage: 'url("https://dvvy6louqcr7j.cloudfront.net/vista/HO00013564/heroPoster/Avatar-The-Way-of-Water.png")'}} className="profile-featured-image"></div>
            </div>
            <span className="featured-item-count">+33</span>
          </div>
         <div className="profile-features-gallary">
            <div className="profile-features-item">
              <div style={{backgroundImage: 'url("https://dvvy6louqcr7j.cloudfront.net/vista/HO00013564/heroPoster/Avatar-The-Way-of-Water.png")'}} className="profile-featured-image"></div>
            </div>
            <span className="featured-item-count">+33</span>
          </div>
         </div>
         <a className='personal-info-button'>Edit features</a>
         </div>
        </FBCard>
        <FBCard>
          <div className="profile-gallery">
            <div className="profile-gallery-header">
              <h3>Photos</h3>
              <a href="#">See All Photos</a>
            </div>
            <div className="profile-gallery-item">
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
              <a href="#"><img src="https://images.unsplash.com/photo-1525673812761-4e0d45adc0cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bmljZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&w=1000&q=80" alt="" /></a>
            </div>
          </div>
        </FBCard>
        <FBCard>
          <div className="profile-gallery">
            <div className="profile-gallery-header">
              <div style={{marginBottom: "10px"}}>
              <h3>Friends</h3>
              <span className="friends-count">4,307 friends</span>
              </div>
              <a href="#">See All Friends</a>
            </div>
            <div className="profile-friends-area">
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
              <div className="profile-item">
                <img src="https://i.pinimg.com/736x/6f/59/d0/6f59d0412dbe92bfd341e61370a4e041.jpg" alt="" />
                <a href="#">Najifa</a>
              </div>
            </div>
          </div>
        </FBCard>
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