import React from 'react'
import './PopCamp.css';
import CardsCamp from './CardsCamp'

function PopCamp() {
  return (
    <div className='popularTrek'>
    <h1>Popular Camping Sites in India</h1><hr/>
    <div className='camp-container'>
      <div className='wrapper'>
          <ul>
              <li>
                <CardsCamp imgLink={require("../components/images/C2.jpg")} 
                name="Rishikesh"   
              />
              </li>
              <li>
                <CardsCamp imgLink={require("../components/images/C5.jpg")} 
                name="Camp Exotica, Kullu"   
              />
              </li>
              <li>
                <CardsCamp imgLink={require("../components/images/C4.jpg")} 
                name="Uttarakhand"
              />
              </li>
              <li>
                <CardsCamp imgLink={require("../components/images/C6.avif")} 
                name="Goa"   
              />
              </li>
              <li>
                <CardsCamp imgLink={require("../components/images/C7.jpg")} 
                name="Sangla"   
              />
              </li>
              <li>
                <CardsCamp imgLink={require("../components/images/C8.jpg")} 
                name="Ladakh"   
              />
              </li>
              <li>
                <CardsCamp imgLink={require("../components/images/C2.jpg")} 
                name="Uttarakhand"   
              />
              </li>
             
              
          </ul>
      </div>
    </div>
  </div>
  )
}

export default PopCamp
