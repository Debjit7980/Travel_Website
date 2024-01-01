import React from 'react'
import Navbar from './Navbar'

function Products(props) {
  return (
    <div>
      <Navbar/>
      <h1>Hello Products {props.name}</h1>
      
    </div>
  )
}

export default Products
