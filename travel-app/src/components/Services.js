import React from 'react'
import HeroSection from './HeroSection'
import Navbar from './Navbar'
import CreateBlogs from './CreateBlogs'


function Services() {
  return (
    <>
      <Navbar/>
      <HeroSection cName="Hero"
      video={require("../components/Videos/vid.mp4")}
      heroHead="Blend Yourself With The Nature"
      btn1="Trekking"
      btn2="Camping"/>
      <CreateBlogs/>
    </>
  )
}

export default Services
