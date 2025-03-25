import MovieBody from '../movies/moviesBody/MovieBody'
import Genre from '../trends/genre/Genre'
import "./seriesRoute.css"

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
