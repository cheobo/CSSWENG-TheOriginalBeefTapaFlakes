import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import './Testimony.css';

const Testimony = () => {
  const testimonies = ['Testimony 1', 'Testimony 2', 'Testimony 3'];

  return (
    <div className="testimony-container">
      <Swiper
        spaceBetween={50}
        slidesPerView={3}
        className="swiper-container"
      >
        {testimonies.map((testimony, index) => (
          <SwiperSlide key={index} className="swiper-slide">
            <div className="card" onClick={() => alert(testimony)}>
              {testimony}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimony;
