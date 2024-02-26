import React, { useState } from 'react';
import './Slider.css';
import slide1 from '../../Assets/slide1.JPG';
import slide2 from '../../Assets/slide2.JPG';
import slide3 from '../../Assets/slide3.jpg';

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [slide1, slide2, slide3];
  const texts = ['BREAKFAST', 'LUNCH', 'DINNER'];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slider-container"> 
      <div className="slider">
        <div className="list">
          {images.map((image, index) => (
            <div className={`item ${index === currentIndex ? 'active' : ''}`} key={index}>
              <img src={image} alt={`Slide ${index + 1}`} className="slide" />
              <div className="centered-text">{texts[index]}</div>
            </div>
          ))}
          <div className="arrows">
            <button id="prev" onClick={handlePrevious}>←</button>
            <button id="next" onClick={handleNext}>→</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
