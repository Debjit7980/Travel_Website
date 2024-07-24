import React from 'react'
import './Wall.css';


function Wall({wall}) {
  return (
    <div>
      <div className="wall">
        <img src={wall.descUrl} alt="wallpaper"/>
      </div>
      <div className='tag'><h1>{wall.name} Trekking Packages</h1></div>
      <h1 id="title">Popular Treks in {wall.name}</h1>
    </div>
  )
}

export default Wall
