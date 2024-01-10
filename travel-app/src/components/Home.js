import React, { useContext, useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import PopTrek from './PopTrek'
import Navbar from './Navbar'
import PopularTrek from './PopularTrek'
import PopCamp from './PopCamp'
import HeroSectionLast from './HeroSectionLast'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import { LoginContext } from './Context'
import './home.css';



function Home() {
  const { loginData, setLoginData } = useContext(LoginContext);
  console.log(loginData.validUserOne);
  const [data, setData] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      try {
        let token = localStorage.getItem("userDataToken");
        if (!token) {
          navigate("/");
        }
        else {
          const res = await fetch("https://naturesdeck-trekcamp-backend-app.onrender.com/validateuser", {
            method: "GET",
            //credentials:"include",
            headers: {
              "Content-Type": "application/json",
              "Authorization": token
            }
          })
          const data = await res.json();
          console.log("Valid User:", data);
          if (data.status === 401 || !data) {
            console.log("Error Page redirect");
            navigate("/login")
          }
          else if (data) {
            console.log("User Verified");
            setLoginData(data);
            navigate("/")
          }
        }

      }
      catch (e) {
        console.log("Error is: ", e);
      }

    }
    setTimeout(() => {
      setData(true);
      validateUser();
    }, 4000)
  }, [navigate,setLoginData])
  return (
    <>
      {
        data ?
          <>
            <Navbar />
            <HeroSection
              cName="Hero"
              video={require("../components/Videos/vid1.mp4")}
              heroHead="Let's get ready to Explore"
              btn1="Travel"
              btn2="Get Started" />
            <PopTrek />                
            <div className='trekBanner'>
              <img src={require("../components/images/TR\ \(1\).jpg")} alt="banner" />
            </div>
            <PopularTrek />
            <PopCamp />
            <HeroSectionLast />
            <Footer />
          </> :
          <div className="preloader">
            <div class="bar">
              <div class="circle"></div>
              <p id="first">Loading</p>
              <p id="second">Loading</p>
              <p>Loading</p>
            </div>
          </div>
      }
    </>
  )
}

export default Home
