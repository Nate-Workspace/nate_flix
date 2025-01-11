import React from "react";
import "./movieCard.css";

const MovieCard = () => {
  return (
    <div className="tbody-card">
      <div className="cardImage">
        <img src="r1.png" alt="movie" />
      </div>

      <div className="cardDetails">
        <div className="titles cardTitle">Star Wars: Solo</div>
        <div className="flexBetween cardDetailsMini">
          <div className="secondaryText releaseDate">2018</div>
          <div className="rating">6.6</div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
