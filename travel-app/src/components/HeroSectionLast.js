import React from 'react'
import './HeroLast.css';

function HeroSectionLast() {
  return (
    <div className='hero-last'>
        <div className='hero-image'> 
            <img src={require("../components/images/O1.jpg")} alt="offers" width="100%" height="1000"/>
        </div>
        <div className='offer'>
            <div className='first'>
                <div className="offer-desc">
                    <h6>Valley of Flowers Trek</h6>
                    <span id="percent">50<small>%</small></span>
                    <h2>Last Minute Offer</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel.</p>
                    <button className='hero-button'>See More</button>
                </div>
            </div><br/>
            <div className='first'>
                <div className='offer-desc next'>
                    <h6>Beas Kund Trek</h6>
                    <span id="percent">30<small>%</small></span>
                    <h2>Last Minute Offer</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pulvinar sed mauris eget tincidunt. Sed lectus nulla, tempor vel.</p>
                    <button className='hero-button'>See More</button>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default HeroSectionLast
