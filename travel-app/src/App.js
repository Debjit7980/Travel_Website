import './App.css';
import Home from './components/Home';
import Services from './components/Services';
import Products from './components/Products';
import { Routes, Route } from 'react-router-dom';
import TrekDesc from './components/TrekDesc';
import SignUp from './components/SignUp';
import Login from './components/Login';
//import { useEffect, useState } from 'react';



function App() {

  /*useEffect(()=>{
    setTimeout(()=>{
      setData(true);
    },2000)
  },[])*/
  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/products" element={<Products name="HEllo" />} />
        <Route path="/trekdesc/:id" element={<TrekDesc />} />
        {/*<Route path='/uk' element={<Uttarakhand/>}/>
              <Route path='/manali' element={<Himachal/>}/>
              <Route path='/west-bengal' element={<WB/>}/>
              <Route path='/sikkim' element={<Sikkim/>}/>
              <Route path='/kashmir' element={<Kashmir/>}/>*/}
      </Routes>
    </>
  );
}

export default App;
