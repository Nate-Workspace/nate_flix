import React, { createContext, useContext, useState } from "react";

export const MoviesFetchContext = createContext();

export const useMovieFetchContext = () => {
  return useContext(MoviesFetchContext);
};

export const MovieFetchProvider = ({ children }) => {
  const apiKey = "7d62e932694fb115cc96edfa471eaf1a";
  //The four catagories----
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  //The two catagrories------
  const [homeMovies, setHomeMovies] = useState([]);
  const [seriesMovies, setSeriesMovies] = useState([]);
  //Searching catagories------------
  const [moviesByGenre, setMoviesByGenre] = useState([]);
  const [genreIDsProvider, setGenreIDsProvider] = useState([]);
  //Details fetch
  const [detailsData, setDetailsData] = useState([]);
  //Get cast and crew
  const [cast, setCast]=useState([])
  //Related movies
  const [similarMovies,setSimilarMovies]= useState([])

  const getHomeMovies = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => setHomeMovies(data.results));
    console.log(pageNumber);
  };

  // The four movie catagories --------------------------------
  const getTrendingMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=2&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setTrendingMovies(data.results));
  };
  const getPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setPopularMovies(data.results));
  };
  const getUpcomingMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setUpcomingMovies(data.results));
  };
  const getTopRatedMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setTopRatedMovies(data.results));
  };

  //Movie type( either a movie or a tv show )--------------------
  const getSeriesMovies = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${pageNumber}&sort_by=popularity.desc&api_key=${apiKey}`
    )
      .then((response) => response.json())
      .then((data) => setSeriesMovies(data.results));
    console.log(pageNumber);
  };

  //-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //-----------------------------------------------------------------------------------------

  //Searching movie by genre-------------------------
  const getMoviesByGenre = (pageNumber) => {
    const IDs = Object.keys(genreIDsProvider).join(",");
    fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreIDsProvider}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => setMoviesByGenre(data.results));
  };

  console.log(genreIDsProvider);
  console.log(moviesByGenre);

  // Searching TV shows by genre-------------------
  const [seriesByGenre, setSeriesByGenre] = useState([]);
  const getSeriesByGenre = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&with_genres=${genreIDsProvider}&page=${pageNumber}`
    )
      .then((response) => response.json())
      .then((data) => setSeriesByGenre(data.results));
  };

  // Movie details page fetch
  const getDetailsData= (pathname)=>{
    fetch(
      `https://api.themoviedb.org/3${pathname}?api_key=7d62e932694fb115cc96edfa471eaf1a`
    )
      .then((response) => response.json())
      .then((data) => setDetailsData(data));
  }

  // Details cast and crew
  const [movieId, setMovieId]=useState()
  const getCast=(pathname)=>{
    fetch(
      `https://api.themoviedb.org/3${pathname}/credits?api_key=7d62e932694fb115cc96edfa471eaf1a`
    )
      .then((response) => response.json())
      .then((data) => setCast(data));
  }

  //Similar movies
  const getSimilarMovies= (pathname)=>{
    fetch(`https://api.themoviedb.org/3${pathname}/recommendations?api_key=7d62e932694fb115cc96edfa471eaf1a&language=en-US&page=1`)
    .then(response=>response.json())
    .then(data=> setSimilarMovies(data.results))
  }
  
  return (
    <MoviesFetchContext.Provider
      value={{
        homeMovies,
        getHomeMovies,
        trendingMovies,
        getTrendingMovies,
        popularMovies,
        getPopularMovies,
        upcomingMovies,
        getUpcomingMovies,
        topRatedMovies,
        getTopRatedMovies,
        seriesMovies,
        getSeriesMovies,
        moviesByGenre,
        getMoviesByGenre,
        setGenreIDsProvider,
        getSeriesByGenre,
        seriesByGenre,
        genreIDsProvider,
        detailsData,
        getDetailsData,
        getCast,
        cast,
        movieId,
        setMovieId,
        getSimilarMovies,
        similarMovies,
      }}
    >
      {children}
    </MoviesFetchContext.Provider>
  );
};

export default MovieFetchProvider;
