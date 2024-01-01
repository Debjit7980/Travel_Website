import React from 'react';
import './HeroSection.css';


function HeroSection(props) {
  
  return (
    <>
      
      <div className={props.cName}>
          <div className='fadeBanner'></div>
          <video src={props.video} autoPlay loop muted></video>
          <div className='hero-text'>
            <h1>{props.heroHead}</h1>
          </div>
          <div className='hero-link'>
            <button className='travel'>{props.btn1}</button>
            <a href="#popularTrek" className='start'>{props.btn2}</a>
          </div>
      </div>
    </>
  )
}

export default HeroSection
