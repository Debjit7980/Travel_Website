import React, { useEffect, useState } from 'react'
import './PopularTrek.css';
//import Cards from './cards'
import './cards.css';
import {Link} from 'react-router-dom';
import axios from 'axios';



function PopularTrek() {
  const [trek,setTrek]=useState([]);
  //const navigate=useNavigate();
  useEffect(()=>{
    axios.get("https://travel-website-rouge.vercel.app")
    .then(treks=>setTrek(treks.data))
    .catch(err=>console.log(err))
  },[])

  return (
    <div className='popularTrek'>
      <h1 id="popularTrek">Popular Treks in India</h1><hr/>
      <div className='card-container'>
        <div className='card-wrapper'>
            <ul className='card-items'>
                {
                  trek.map((t)=>{
                    return<button id="navi">
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
