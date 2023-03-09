import React, { useEffect, useState } from "react";
import "./StorySlider.css";
import "boxicons/css/boxicons.css";
import { useSelector } from "react-redux";


const StorySlider = ({ hide }) => {

  const {user} = useSelector(state => state.auth)
  const [sliderIndex, setSliderIndex] = useState(0);

  let featured = user.featured[1].slider
  let feturedName = user.featured[1].name
  const handleSlideNext = () => {
    setSliderIndex((sliderIndex + 1) % featured.length);
  };
  const handleSlidePrev = () => {
    setSliderIndex((sliderIndex - 1) % featured.length);
  };

  
  useEffect(() => {
    const sliderTimout = setTimeout(() => {
      if (sliderIndex <= featured.length) {
        setSliderIndex(sliderIndex + 1);
      }
      if (sliderIndex === featured.length - 1) {
        hide(false);
      }
    }, 5000);

    return () => clearTimeout(sliderTimout);
  }, [sliderIndex]);

  

  return (
    <div className="story-slider-wrapper">
      <div className="story-slider">
        <div
          className="slider-item"
          style={{ backgroundImage: `url(/slider/${featured[sliderIndex]})`}}

         >
          <div className="featuredName">
            <p>{feturedName}</p>
          </div>
          <div className="topbar-progress-wrapper">
            {featured.map((item, index) => (
              <div
                className={`bars-item 
               ${index === sliderIndex ? "active" : ""} 
               ${index < sliderIndex ? "viewd" : ""}`}
                key={index}
              >
                <div className="progress"></div>
              </div>
            ))}
          </div>
          <div className="navbar-wrapper">
            <div className="prev">
              <button onClick={handleSlidePrev}>
                <i class="bx bx-chevron-left"></i>
              </button>
            </div>
            <div className="next">
              <button onClick={handleSlideNext}>
                <i class="bx bx-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorySlider;

// /api/public/slider/1678210990349_Believe you can and you're halfway there. (1).jpg