import React, { useEffect, useState } from "react";
import "./hero.css";
import Navbar from "./header/Navbar";
import Herobody from "./herobody/Herobody";
import { useMovieFetchContext } from "../../contexts/movieFetchProvider";

const Hero = () => {
  const [heroImage,setHeroImage]=useState(null)

  const {homeMovies,getHomeMovies}= useMovieFetchContext()
  useEffect(()=>{
    getHomeMovies(1)
  },[])

  useEffect(()=>{
    if(homeMovies.length>0){
      const randomNumber= Math.floor(Math.random()* homeMovies.length)
      setHeroImage(homeMovies[randomNumber])
    }
  },[homeMovies])

  if (!heroImage) return null; // Show the loading state here Nate

  return (
    <div className="hero">
        <img src={`https://image.tmdb.org/t/p/w500${heroImage.poster_path}`} className="hero-image" alt="" />
        <div className="hero-shadow"></div>
        <Navbar />
        <Herobody />
    </div>
  );
};

export default Hero;
