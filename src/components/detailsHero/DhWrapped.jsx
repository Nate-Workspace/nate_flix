import React from 'react'
import DetailsHero from './DetailsHero'
import "./DhWrapped.css"
import Navbar from "../hero/header/Navbar"

const DhWrapped = () => {
  return (
    <div className='wrapper-hero'>
      <img src="r3.png" className="dh-image" alt="" />
      <div className="dh-shadow"></div>
      <Navbar />
      <DetailsHero/>
    </div>
  )
}

export default DhWrapped
