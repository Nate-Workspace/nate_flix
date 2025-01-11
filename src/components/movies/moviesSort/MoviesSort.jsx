import React from 'react'
import './moviesSort.css'

const MoviesSort = () => {
  return (
    <div className="sort-wrapper">
        <div className="innerWidth paddings flexStart sort-container">
            <span>Sort by:</span>
            <span className='button'>Latest</span>
            <span className='button'>Popular</span>
            <span className='button'>A-Z</span>
        </div>
    </div>
  )
}

export default MoviesSort
