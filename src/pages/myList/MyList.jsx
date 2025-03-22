import React, { useEffect, useState } from "react";
import Navbar from "../../components/hero/header/Navbar";
import { getDocs, collection } from "firebase/firestore";
import { useTrendsContext } from "../../contexts/TrendsContextProvider";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebase";
import toast from "react-hot-toast";

const MyList = () => {
  const {savedMovies, getSavedMovies} = useTrendsContext();
  const {getDetailsData, setMovieId,getCast, getSimilarMovies}= useMovieFetchContext()
  const navigate= useNavigate();
  const [savedUserMovies, setSavedUserMovies]= useState([]);


  
  useEffect(() => {
    getSavedMovies();
  }, []);

  useEffect(() => {
    if (savedMovies && auth?.currentUser) {
      const userMovies = savedMovies.filter(each => each.user_id === auth.currentUser.uid);
      setSavedUserMovies(userMovies);
    }
    if(!auth.currentUser){
      setSavedUserMovies([])
    }
  }, [savedMovies, auth?.currentUser]);

  //On movie Click---------------
  const onMovieClick=(id, type)=>{
    console.log('Saved movie is clicked')
    getDetailsData(`/${type}/${id}`)
    setMovieId(id)
    getCast(`/${type}/${id}`)
    getSimilarMovies(`/${type}/${id}`)
    navigate(`/${type}/${id}`);
  }

  console.log(savedUserMovies)

  return (
    <div>
      <Navbar />
      <div
            className={`flexColStart mbody-wrapper`}
          >
            <span className="primaryText"> Your saved movies </span>
            {/* <Genre/> */}
            <div
              className={` innerWidth paddings flexCenter mbody-container`}
            >
              {savedUserMovies.map((each) => {
                return (
                  <div className="m-body-card" onClick={()=> onMovieClick(each.movie_id, each.type)} key={each.id}>
                    <div className="m-cardImage">
                      <img
                        src={`https://image.tmdb.org/t/p/w500${each.poster_path}`}
                        alt="Poster unavailable"
                      />
                    </div>
      
                    <div className="m-cardDetails">
                      <div className="titles m-cardTitle">{each.title}</div>
                      <div className="flexBetween m-cardDetailsMini">
                        <div className="secondaryText m-releaseDate">
                          {each.release_date}
                        </div>
                        <div className="m-rating">{each.vote_average}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            {/* {location.pathname != "/" && (
              <div className="flexStart paddings slide-buttons">
                <button
                  className={`swipers ${pageNumber == 1 ? "disabled" : ""}`}
                  onClick={onLeftArrowClick}
                >
                  {<FaArrowLeft size={20} />}
                </button>
                <span>{pageNumber}</span>
                <button className={`swipers ${lastSlide ? "last" : ""}`} onClick={onRightArrowClick}>
                  {<FaArrowRight size={20} />}
                </button>
              </div>
            )} */}
          </div>
    </div>
  );
};

export default MyList;
