import React, { useEffect, useState } from "react";
import { featured } from "../../Faker/featured";
import "./StorySlider.css";
import "boxicons/css/boxicons.css";
const StorySlider = ({ hide }) => {
  const [sliderIndex, setSiderIndex] = useState(0);

  const handleSlideNext = () => {
    setSiderIndex((sliderIndex + 1) % featured.length);
  };
  const handleSlidePrev = () => {
    setSiderIndex((sliderIndex - 1) % featured.length);
  };

  useEffect(() => {
    const sliderTimout = setTimeout(() => {
      if (sliderIndex <= featured.length) {
        setSiderIndex(sliderIndex + 1);
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
          style={{ backgroundImage: `url(${featured[sliderIndex].photo})` }}
        >
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
