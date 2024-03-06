import React, { useState, useEffect } from 'react';
import { Fade } from 'react-awesome-reveal';
import styles from './Featured.module.css'; 
import f1_img from '../../Assets/fprod1.JPG'
import f2_img from '../../Assets/fprod2.JPG'

const Featured = () => {
  const images = [f1_img, f2_img];
  const descriptions = ['Experience the heavenly taste of our Adobo Flakes, carefully harvested from the clouds where flavors blend with ethereal perfection. Each bite unveils a symphony of savory goodness, transporting you to culinary nirvana.'
  , 'Dive into a celestial feast with our Adobo Flakes, crafted from clouds where flavor reigns supreme. Delicately harvested and expertly seasoned, each bite offers a glimpse into the divine, leaving taste buds enchanted and cravings satisfied.'];
  const titles = ['Sub-Reseller Package', 'Reseller Package'];

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    setHasAnimated(true);
  }, []);

  return (
    <div className={styles.featured}>
      <h1 className={styles.title}>Beefy, Flakey, and Original.</h1>
      <div className={styles.container}>
        <div className={styles.features}>
          {images.map((image, index) => (
            <Fade delay={index * 150} key={index} triggerOnce={hasAnimated}>
              <div className={`${styles.item} ${index % 2 === 0 ? styles.row : styles['row-reverse']} ${index === 1 ? styles['second-item'] : ''}`}>
                <div className={styles.imagecontainer}>
                  <img src={image} alt="" className={styles['featured-image']} />
                </div>
                <div className={styles.description}>
                  <h2>{titles[index]}</h2>
                  <p>{descriptions[index]}</p>
                  <button className={`${styles.button} ${index % 2 !== 0 ? styles['button-right'] : ''}`}>Buy Now</button>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Featured;
