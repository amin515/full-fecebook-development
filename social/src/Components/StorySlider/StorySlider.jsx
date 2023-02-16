
import React, { useEffect, useState } from 'react'; 
import { featured } from '../../Faker/featured';
import './StorySlider.css';
const StorySlider = () => {
    const [sliderIndex, setSiderIndex] = useState(0)


    useEffect(() => {
      const sliderInterval = setTimeout(() => {
          setSiderIndex((sliderIndex + 1) % featured.length)
      }, 5000)
    }, [sliderIndex])


  return(
    <div className='story-slider-wrapper'>
        <div className="story-slider">
            <div className="slider-item" style={{backgroundImage : `url(${featured[sliderIndex].photo})`}}>
             <div className="topbar-progress-wrapper">
              {featured.map((item, index) => 
               <div className={`bars-item 
               ${index === sliderIndex ? 'active' : ''} 
               ${index < sliderIndex ? 'viewd' : ''}`} key={index}>
                <div className="progress"></div>
               </div>
              )}
             </div>
            </div>
        </div>
    </div>
  )
}

export default StorySlider;