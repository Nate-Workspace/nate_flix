import React, { useEffect, useState } from "react";
import "./detailsHero.css";
import { FaHeart } from "react-icons/fa";
import { FaBookmark,FaRegBookmark } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useMovieFetchContext } from "../../contexts/MovieFetchProvider";
import { useTrendsContext } from "../../contexts/TrendsContextProvider";
import { collection, deleteDoc,doc, addDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

const DetailsHero = () => {
  const { detailsData, getDetailsData, cast } = useMovieFetchContext();
  const [formattedGenres, setFormattedGenres] = useState([]);
  const location = useLocation();
  //Save state:
  const {saveState, setSaveState,getSavedMovies, savedMovies}= useTrendsContext()
  const savedCollectionRef= collection(db, 'saved');

  const locationArray= location.pathname.split('/');

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


  //Save Functionality:------------------------------------------------------------------
  useEffect(() => {
    if (!auth.currentUser || !savedMovies) {
      setSaveState(false); // Reset save state if no user is logged in
      return;
    }
  
    const isAlreadySaved = savedMovies.some(
      (each) =>
        each.movie_id == locationArray[2] &&
        each.type == locationArray[1] &&
        each.user_id === auth.currentUser.uid
    );
  
    setSaveState(isAlreadySaved);
  }, [auth.currentUser, savedMovies, locationArray]); // Add auth.currentUser to the dependency array
  
  

  const onSaveClick = async () => {
    
    const newSaveState = !saveState;
    setSaveState(newSaveState);
  
    if (newSaveState) {
      console.log({
        title: detailsData.name || detailsData.title,
        poster_path: detailsData.poster_path,
        movie_id: detailsData.id,
        rating: detailsData.vote_average,
        release_date:
          locationArray[1] === "movie"
            ? detailsData.release_date
            : detailsData.first_air_date,
        type: locationArray[1],
        user_id: auth?.currentUser?.uid,
      });
      
      try {
        await addDoc(savedCollectionRef, {
          title: detailsData.name || detailsData.title,
          poster_path: detailsData.poster_path,
          movie_id: detailsData.id,
          rating: detailsData.vote_average,
          release_date:
            locationArray[1] === "movie"
              ? detailsData.release_date
              : detailsData.first_air_date,
          type: locationArray[1],
          user_id: auth?.currentUser?.uid,
        });
        console.log("Saved successfully");
        getSavedMovies();
      } catch (err) {
        console.error("Error saving to Firebase:", err);
      }
    } else {
      const thisMovie = savedMovies.find(
        (each) => each.movie_id.toString() === locationArray[2] && each.type === locationArray[1] && each.user_id === auth?.currentUser?.uid
      );
  
      console.log(thisMovie);
  
      if (thisMovie) {
        try {
          await deleteDoc(doc(db, "saved", thisMovie.id)); // Assuming "id" is the Firebase document ID
          console.log("Deleted successfully");
          getSavedMovies(); 
        } catch (err) {
          console.error("Error deleting from Firebase:", err);
        }
      }
    }
  };
  

  useEffect(()=>{
    console.log(saveState)
  },[])
  

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
            <span onClick={onSaveClick}>
              {saveState== true? <FaBookmark size={17} /> : <FaRegBookmark size={17} />}
              
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
