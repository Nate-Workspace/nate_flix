import React, { useEffect, useState } from "react";
import "./detailsHero.css";
import { FaHeart } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";

const DetailsHero = () => {
  const { detailsData, getDetailsData, cast } = useMovieFetchContext();
  const [formattedGenres, setFormattedGenres] = useState([]);
  const location = useLocation();

  const locationArray= location.pathname.split('/');

  // useEffect(() => {
  //   getDetailsData(location.pathname);
  // }, [location.pathname]);

  useEffect(() => {
    if (detailsData && detailsData.genres) {
      setFormattedGenres(detailsData.genres.map((each) => each.name));
    }
  }, [detailsData]);

  if (!detailsData) {
    return <div className="loading">Loading</div>;
  }

  //utility function for safe access of the data
  const {
    poster_path = "",
    title = "Title not available",
    release_date = "NA",
    genres = [],
  } = detailsData;

  const formattedReleaseDate = release_date.split("-")[0] || "NA";

  //Duration edit:
  const duration = `${Math.floor(detailsData?.runtime / 60)}hr ${
    detailsData?.runtime % 60
  }min`;

  //For the director and main actor:
  const director =
    cast?.crew?.find((each) => each.department === "Directing")?.name ||
    "Unknown";
  const mainActors = cast?.cast?.slice(0, 2).map((each) => each.name) || [];

  console.log(detailsData)

  return (
    <div className="dh-wrapper">
      <div className="flexStart paddings innerWidth dh-container">
        {/* Hero left */}
        <div className="dh-left">
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt="movie poster"
          />
        </div>

        {/* Hero right */}
        <div className="flexColStart dh-right">
          {/* Header Name */}
          <div className="dh-header">
            <div className="dh-header-Name">
              <span className="primaryTitle">{locationArray[1]=="movie"? title : detailsData?.name}</span>
              <span>({locationArray[1]=="movie"? formattedReleaseDate: detailsData?.first_air_date?.split("-")[0] || "NA"})</span>
            </div>
            <div className="flexStart dh-header-smallName">
              <span>{locationArray[1]=='movie'?release_date: detailsData?.first_air_date}</span>
              <span>{formattedGenres.join(", ")}</span>
              <span>{locationArray[1]=="movie"? duration: `${detailsData?.last_episode_to_air?.episode_number} Episodes,    ${detailsData?.last_episode_to_air?.season_number} Seasons` }</span>
            </div>
          </div>

          {/* Rating */}
          <div className="dh-rating">
            <span>User Score: </span>
            <span>
              {detailsData?.vote_average
                ? parseFloat(detailsData?.vote_average.toFixed(1))
                : "NA"}
            </span>
          </div>

          {/* Call to actions */}
          <div className="flexStart dh-buttons">
            <span>
              <FaPlay size={15} />
            </span>
            <span>
              <FaHeart size={15} />
            </span>
            <span>
              <FaBookmark size={15} />
            </span>
          </div>

          {/* Overview */}
          <div className="flexColStart dh-overview">
            <span>Overview</span>
            <span>{detailsData.overview? detailsData?.overview : "description unavailable"}</span>
          </div>

          {/* Roles */}
          <div className="flexStart dh-roles">
            <div className="flexColStart dh-role-item">
              <span>Director</span>
              <span>{director}</span>
            </div>
            <div className="flexColStart dh-role-item">
              <span>Main actor</span>
                <span>{mainActors[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsHero;
