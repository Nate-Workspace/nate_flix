import React from 'react'
import "./seriesRoute.css"
import Genre from '../trends/genre/Genre'
import MovieBody from '../movies/moviesBody/MovieBody'

const SeriesRoute = () => {
  return (
    <div>
      <div className="s-route-wrapper">
      <div className="innerWidth paddings flexCenter s-route-container">
        <div className="s-route-right">
          <Genre call="routes"/>
          <MovieBody call="routes" />
        </div>
      </div>
    </div>
    </div>
  )
}

export default SeriesRoute
