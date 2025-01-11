import React from "react";
import Navbar from "../../components/hero/header/Navbar";
import MoviesRouteBody from "../../components/moviesRoute/moviesRouteBody/MoviesRouteBody";

const Movies = () => {
  return (
    <div>
      <Navbar />
        <MoviesRouteBody />
    </div>
  );
};

export default Movies;
