import React, { useEffect, useState } from 'react'
import './PopularTrek.css';
//import Cards from './cards'
import './cards.css';
import {Link} from 'react-router-dom';
//import axios from 'axios';



function PopularTrek() {
  const [trek,setTrek]=useState([]);
 
  //const navigate=useNavigate();
  /*useEffect(()=>{
    axios.get("https://naturesdeck-backend-app.onrender.com/")
    .then(res=>setTrek(res.data))
    .catch(err=>console.log(err))
  },[])*/
  useEffect(() => {
    fetch("https://naturesdeck-trekcamp-backend-app.onrender.com")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => setTrek(data))
        .catch(error => console.error('Error fetching data:', error));
  },[]);
  console.log("Value of popularTreks:", trek);
  return (
    <div className='popularTrek'>
      <h1 id="popularTrek">Popular Treks in India</h1><hr/>
      <div className='card-container'>
        <div className='card-wrapper'>
            <ul className='card-items'>
                {
                  trek.map((t)=>{
                    return<button id="navi" key={t._id}>
                      <li className='card-item'>
                        <Link to={`/trekdesc/${t._id}`}>
                          <div className='figure'>
                            <img src={t.imgUrl} alt="TrekImage" />
                            <div className='fade'></div>
                            <div className='card-desc'>
                              <p>{t.name}</p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </button>
                  })
                }
            </ul>
        </div>
      </div>
      
    </div>
  )
}

export default PopularTrek
