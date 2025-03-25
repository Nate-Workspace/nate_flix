import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import Navbar from "./header/Navbar";
import "./hero.css";
import Herobody from "./herobody/Herobody";

const Hero = () => {
  const [heroImage,setHeroImage]=useState(null)
  const [isLoading, setIsLoading]= useState(false)

  const {homeMovies,getHomeMovies}= useMovieFetchContext()
  useEffect(()=>{
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        await getHomeMovies(1);
      } catch (error) {
        console.log("Error fetching home hero");
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  },[])

  useEffect(()=>{
    if(homeMovies.length>0){
      const randomNumber= Math.floor(Math.random()* homeMovies.length)
      setHeroImage(homeMovies[randomNumber])
    }
  },[homeMovies])

  return (
    <div className="hero">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          <p className="text-white mt-2">Loading...</p>
        </div>
      ) : heroImage ? (
        <>
        <img src={`https://image.tmdb.org/t/p/w500${heroImage.poster_path}`} className="hero-image" alt="" />
        <div className="hero-shadow"></div>
        <div className="hero-shadow2"></div>
        <Navbar />
        <Herobody />
        </>
      ):(<p className="text-white"></p>)}
    </div>
  );
};

export default Hero;
