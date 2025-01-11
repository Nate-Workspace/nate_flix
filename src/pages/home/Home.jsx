import React from 'react'
import MovieFetchProvider from '../../contexts/movieFetchProvider'
import TrendsContextProvider from '../../contexts/TrendsContextProvider'

import MovieBody from "../../components/movies/moviesBody/MovieBody";
import MoviesNav from "../../components/movies/moviesNav/MoviesNav";
import MoviesSort from "../../components/movies/moviesSort/MoviesSort";
import Genre from "../../components/trends/genre/Genre";
import TrendsBody from "../../components/trends/trendsBody/TrendsBody";
import TrendsNav from "../../components/trends/trendsNav/TrendsNav";
import Hero from "../../components/hero/Hero";
import Footer from "../../components/footer/Footer"

const Home = () => {
  return (
    <div>
      {/* <MovieFetchProvider> */}
        <Hero/>
        {/* <TrendsContextProvider> */}
          <TrendsNav />
          {/* <Genre /> */}
          <TrendsBody />
          <MoviesNav />
          {/* <Genre /> */}
          <MoviesSort />
          <MovieBody />
        {/* </TrendsContextProvider> */}
      {/* </MovieFetchProvider> */}
    </div>
  )
}

export default Home
