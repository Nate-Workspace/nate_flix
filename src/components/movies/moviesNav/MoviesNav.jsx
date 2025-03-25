import React from 'react'
import "./moviesNav.css"
import { FaTv , FaFilm } from 'react-icons/fa'
import { useTrendsContext } from '../../../contexts/TrendsContextProvider'
import Genre from '../../trends/genre/Genre'

const MoviesNav = () => {

  const {moviesNavValue, setMoviesNavValue}= useTrendsContext();

  //On Click of the Nav bar---------
  const onMoviesNavClick=(active)=>{
    setMoviesNavValue(active)
  }

  return (
    <div className="movies-wrapper">
        <div className="paddings innerWidth movies-container mb-[-10px]">
            <div className=" flex items-center justify-around movies-tab">
            <div className={`movies ${moviesNavValue=="Movies" ? "active" : ""}`} onClick={()=> onMoviesNavClick("Movies") }>
                <FaTv size={20} />
                <span>Movies</span>
            </div>
            <div className={`movies ${moviesNavValue=="Series" ? "active" : ''}`} onClick={()=> onMoviesNavClick("Series")}>
                <FaFilm size={20} />
                <span>Series</span>
            </div>
            </div>
            <hr />
        </div>
    </div>
  )
}

export default MoviesNav
