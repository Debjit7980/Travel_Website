import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Wall from './Wall';
import { useParams } from 'react-router-dom';
//import axios from 'axios';
import TrekCard from './TrekCard';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function TrekDesc() {
    const {id}=useParams();
    const [desc,setDesc]=useState({});
    const [data, setData] = useState(false)
    /*useEffect(()=>{
        fetch("https://naturesdeck-backend-app.onrender.com/getTrek/"+id)
        .then(res=>{
            setTimeout(()=>{
              setDesc(res.data)
              setData(true)
              window.scrollTo(0, 0);
              console.log(res.data)
            },2000)
        })
        .catch(e=>console.log(e))
    },[])*/
    useEffect(() => {
      fetch(`https://naturesdeck-trekcamp-backend-app.onrender.com/getTrek/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          setTimeout(() => {
            setDesc(data);
            setData(true);
            window.scrollTo(0, 0);
            console.log(data);
          }, 2000);
        })
        .catch(error => console.log(error));
    }, [id]);
    var trips=String(desc.routes);
    var tripimg=String(desc.trekimg);
    trips=trips.slice(1,-1).split(",");
    tripimg=tripimg.slice(1,-1).split(",");
    console.log(trips)
    console.log(typeof(trips));
  return (
    <div>
      {data ? 
        <>
        <Navbar/>
        <Wall wall={desc} />
        {trips.map((trip,index)=>(
          <TrekCard key={index} treks={desc} trip={trip}  tripimg={tripimg[index]} />
        ))}
        </>
        : 
        <Box sx={{ display: 'flex', position: 'absolute', left: '50%', alignItems: 'center', height: "100vh" }}>
            Loading...&nbsp;
            <CircularProgress />
        </Box>
      }
      
        {/*<TrekCard treks={desc}/> */}
    </div>
  )
}

export default TrekDesc
