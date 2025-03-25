import MovieBody from "../../movies/moviesBody/MovieBody";
import Genre from "../../trends/genre/Genre";
import "./moviesRouteBody.css";

const MoviesRouteBody = () => {
  return (
    <div className="d-body-wrapper">
      <div className="innerWidth paddings flexCenter d-body-container">
        <div className="d-body-right">
          <Genre call="routes"/>
          <MovieBody call="routes" />
        </div>
      </div>
    </div>
  );
};

export default MoviesRouteBody;
