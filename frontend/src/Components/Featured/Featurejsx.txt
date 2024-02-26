import React from 'react';
import './Featured.css';
import f1_img from '../../Assets/fprod1.JPG'
import f2_img from '../../Assets/fprod2.JPG'
import f3_img from '../../Assets/fprod3.JPG'

const Featured = () => {
  return (
    <div className="featured">
      <hr />
      <h1>FEATURED PRODUCTS</h1>
      <div className="featured-imgs">
        <div className="featured-image-container">
          <img src={f1_img} alt="" className="featured-image" />
          <div className="image-overlay">
            <span className="image-text">Buy Now</span>
          </div>
          <h3>Adobo Flakes 1</h3>
          <p>Experience the heavenly taste of our Adobo Flakes, carefully harvested from the clouds where flavors blend with ethereal perfection. Each bite unveils a symphony of savory goodness, transporting you to culinary nirvana.</p>
        </div>
        <div className="featured-image-container">
          <img src={f2_img} alt="" className="featured-image" />
          <div className="image-overlay">
            <span className="image-text">Buy Now</span>
          </div>
          <h3>Adobo Flakes 2</h3>
          <p>Dive into a celestial feast with our Adobo Flakes, crafted from clouds where flavor reigns supreme. Delicately harvested and expertly seasoned, each bite offers a glimpse into the divine, leaving taste buds enchanted and cravings satisfied.</p>
        </div>
        <div className="featured-image-container">
          <img src={f3_img} alt="" className="featured-image" />
          <div className="image-overlay">
            <span className="image-text">Buy Now</span>
          </div>
          <h3>Adobo Flakes 3</h3>
          <p>Indulge in the celestial essence of our Adobo Flakes, sourced from the heavens above where culinary magic unfolds. Born from clouds kissed by flavor, these flakes offer a taste journey like no other, elevating your dining experience to celestial heights.</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;
