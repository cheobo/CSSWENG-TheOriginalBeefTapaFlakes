import React from 'react';
import './Featured.css';
import f1_img from '../../Assets/fprod1.JPG'
import f2_img from '../../Assets/fprod2.JPG'
import f3_img from '../../Assets/fprod3.JPG'

const Featured = () => {
  return (
    <div className="featured">
      <hr className="hr" />
      <div className="container">
        <div className="features">
          <div className="item1">
            <div className="imagecontainer">
              <img src={f1_img} alt="" className="featured-image" />       
                </div>
          </div>
          <div className="item1">
            <div className="imagecontainer">
              <img src={f2_img} alt="" className="featured-image" />
                </div>
          </div>
          <div className="item1">
            <div className="imagecontainer">
              <img src={f3_img} alt="" className="featured-image" />
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
