import React from 'react'
import Slider from '../../Slider/Slider.jsx'
import Featured from '../../Featured/Feature.jsx'
import Testimony from '../../Testimonials/Testimony.jsx'
import Dulo from '../../Footer/Dulo.jsx'
import './Home.css'

const Home = () => {
  return (
    <div className='top'>
      <Slider/>
      <Featured/>
      <Testimony/>
      <Dulo />

    </div>
  )
}

export default Home