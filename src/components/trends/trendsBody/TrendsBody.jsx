import React, { useEffect, useState } from "react";
import "./trendsBody.css";
import { useMovieFetchContext } from "../../../contexts/movieFetchProvider";
import { useTrendsContext } from "../../../contexts/TrendsContextProvider";
import { useNavigate } from "react-router-dom";

const TrendsBody = () => {
  const {trendingMovies, getTrendingMovies, popularMovies, getPopularMovies, upcomingMovies, getUpcomingMovies,topRatedMovies, getTopRatedMovies}= useMovieFetchContext()
  const {trendsNavValue}= useTrendsContext()
  const [trendsRender, setTrendsRender]= useState([])
  const navigate= useNavigate();

  //Fetching and setting the value for the Horisontal slider
  const fetchActions = {
    Trending: { fetch: getTrendingMovies, data: trendingMovies },
    Popular: { fetch: getPopularMovies, data: popularMovies },
    TopRated: { fetch: getTopRatedMovies, data: topRatedMovies },
    Upcoming: { fetch: getUpcomingMovies, data: upcomingMovies },
  };

  useEffect(() => {
    const action = fetchActions[trendsNavValue] || fetchActions["Trending"];
    action.fetch();
  }, [trendsNavValue]);

  useEffect(() => {
    const action = fetchActions[trendsNavValue] || fetchActions["Trending"];
    if (action.data.length > 0) {
      setTrendsRender(action.data);
    }
  }, [trendsNavValue, trendingMovies, popularMovies, topRatedMovies, upcomingMovies]);

  //-----------------------------------------------


  // On movie click----------------------------
  const onMovieClick=(id)=>{
    navigate(`/movie/${id}`)
  }
  
  if (!trendsRender || trendsRender.length === 0) {
    return <div>Loading...</div>; // Add a loading state
  }
  return (
    <div className=" flexCenter tbody-wrapper">
      <div className="paddings tbody-container">
        {trendsRender.map((each) => {
          return(
          <div className="tbody-card" onClick={()=>onMovieClick(each.id)} key={each.id}>
            <div className="cardImage">
              <img src={`https://image.tmdb.org/t/p/w500${each.poster_path}`} alt="movie" />
            </div>

            <div className="cardDetails">
              <div className="titles cardTitle">{each.title}</div>
              <div className="flexBetween cardDetailsMini">
                <div className="secondaryText releaseDate">
                  {each.release_date}
                </div>
                <div className="rating">{each.vote_average}</div>
              </div>
            </div>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default TrendsBody;



// useEffect(()=>{
  //   console.log(trendsNavValue)
  //   if(trendsNavValue=="Trending"){
  //     getTrendingMovies()
  //   }
  //   else if(trendsNavValue== "Popular"){
  //     getPopularMovies()
  //   }
  //   else if( trendsNavValue=="TopRated"){
  //     getTopRatedMovies()
  //   }
  //   else if(trendsNavValue== "Upcoming"){
  //     getUpcomingMovies()
  //   }else{
  //     getTrendingMovies()
  //   }
  // },[trendsNavValue])

  // //  Setting the trendsREnder

  // useEffect(() => {
  //   if (trendsNavValue === "Trending" && trendingMovies.length > 0) {
  //     setTrendsRender(trendingMovies);
  //   } else if (trendsNavValue === "Popular" && popularMovies.length > 0) {
  //     setTrendsRender(popularMovies);
  //   } else if (trendsNavValue === "TopRated" && topRatedMovies.length > 0) {
  //     setTrendsRender(topRatedMovies);
  //   } else if (trendsNavValue === "Upcoming" && upcomingMovies.length > 0) {
  //     setTrendsRender(upcomingMovies);
  //   }
  // }, [trendsNavValue, trendingMovies, popularMovies, topRatedMovies, upcomingMovies]);