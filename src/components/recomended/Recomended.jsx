import React, { useEffect } from "react";
import "./recomended.css";
import { mockData } from "../../assets/mockData";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import { useLocation, useNavigate } from "react-router-dom";

const Recomended = () => {
  const { similarMovies, getSimilarMovies,getDetailsData,getCast,setMovieId } = useMovieFetchContext();
  const location = useLocation();
  const locationArray= location.pathname.split('/');
  const navigate= useNavigate()
  useEffect(() => {
    getSimilarMovies(location.pathname);
  }, [location.pathname]);

  console.log(similarMovies);

  //On movie click:
  const onMovieClick=(id)=>{
    if(locationArray[1]=="movie"){
    console.log('onMovieClick')
    getDetailsData(`/movie/${id}`)
    setMovieId(id)
    getCast(`/movie/${id}`)
    getSimilarMovies(`/movie/${id}`)
    navigate(`/movie/${id}`);
  } else if(locationArray[1]=="tv"){
    getDetailsData(`/tv/${id}`)
    setMovieId(id)
    getCast(`/tv/${id}`)
    getSimilarMovies(`/tv/${id}`)
    navigate(`/tv/${id}`);
  }
  }
  return (
    <div className="recommended-wrapper">
      <div className="innerWidth recommended-title">{locationArray[1]=="movie"? 'Similar movies' : 'Similar shows' }</div>
      <div className="recommended-container">
        {similarMovies?.map((each, index) => {
          return (
            <div className="recommended-card" onClick={()=>onMovieClick(each.id)} key={index}>
              <div className="recommended-cardImage">
                <img
                  src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                  alt="movie"
                />
              </div>

              <div className="recommended-cardDetails">
                <div className="recommended-movieName">{locationArray[1]=='movie'? each.title: each.name}</div>
                <div className="recommended-rating">
                  {each?.vote_average
                    ? parseFloat(each.vote_average.toFixed(1))
                    : "NA"}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recomended;
