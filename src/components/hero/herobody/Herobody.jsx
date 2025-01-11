import React from 'react'
import './herobody.css'
import { FaSearch } from 'react-icons/fa'
import SearchBar from '../../../separateComps/searchBar/SearchBar'

const Herobody = () => {
  return (
    <div className='hero-wrapper'>
      <div className="innerWidth flexColCenter hero-container">
        <div className="flexColCenter hero-texts">
            <div className="hero-title">
                <img src='./NATEflix.png' alt='LOGO'/>
            </div>
            <div className="hero-desc">
                Millions of movies, TV shows and people to discover. Explore now!
            </div>
        </div>
        <div className="flexColCenter w-full g4 hero-bottom">
        <SearchBar/>
        
        {/* <div className="hero-indicators">
            <span></span><span></span><span></span>
        </div> */}
        </div>
      </div>
    </div>
  )
}

export default Herobody
