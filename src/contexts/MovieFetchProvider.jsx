import React, { createContext, useContext, useState } from "react";
import axios from "axios";

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
  const getDetailsData= async (pathname)=>{
    try {
      const response= await fetch(`https://api.themoviedb.org/3${pathname}?api_key=${apiKey}`)
      const data= await response.json();
      setDetailsData(data)
    } catch (error) {
      console.error("Error fetching Details")
    };
    
  }

  // Details cast and crew
  const [movieId, setMovieId]=useState()
  const getCast= async (pathname)=>{
    try {
      const response = await fetch(`https://api.themoviedb.org/3${pathname}/credits?api_key=${apiKey}`);
      const data= await response.json();
      setCast(data); 
    } catch (error) {
      console.error("Error fetching cast: ", error )
    };
  }

  //Similar movies
  const getSimilarMovies = async (pathname) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3${pathname}/recommendations?api_key=${apiKey}&language=en-US&page=1`);
      const data = await response.json();
      setSimilarMovies(data.results);
    } catch (error) {
      console.error("Error fetching similar movies:", error);
    }
  };
  

  //SEARCH FUNCTIONALITY--------------------------------------
  const searchMovies = async (query) => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi`, {
        params: {
          api_key: apiKey,
          query: query,
          include_adult: false,
        },
      });
      return response.data.results; 
    } catch (error) {
      console.error("Error fetching search results:", error);
      return [];
    }
  };
  
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
        setDetailsData,
        getCast,
        setCast,
        cast,
        movieId,
        setMovieId,
        getSimilarMovies,
        similarMovies,
        setSimilarMovies,
        searchMovies,
      }}
    >
      {children}
    </MoviesFetchContext.Provider>
  );
};

export default MovieFetchProvider;
