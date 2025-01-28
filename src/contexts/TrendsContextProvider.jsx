import React, { createContext, useContext, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const TrendsContext = createContext();
export const useTrendsContext = () => {
  return useContext(TrendsContext);
};
const TrendsContextProvider = ({ children }) => {
  // setting the trends nav value:-----------------------
  const [trendsNavValue, setTrendsNavValue] = useState("Trending");
  console.log(trendsNavValue);

  //setting the value for Movies Nav --------------------
  const [moviesNavValue, setMoviesNavValue] = useState("Movies");
  console.log(moviesNavValue);

  //Saving state
  const [saveState, setSaveState]= useState(false)

 
 
  //Getting the genre list from the api:--------------------
  const [genreList, setGenreList]= useState([])

  const getGenreList= (genreType)=>{
    fetch(
      `https://api.themoviedb.org/3/genre/${genreType}/list?api_key=7d62e932694fb115cc96edfa471eaf1a&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setGenreList(data.genres));
  };

  // ######################## SAVING CONTEXT LOGIC---------------------------------------------------------------------------
  const savedCollectionRef = collection(db, "saved");

  // Getting the saved data:
  const [savedMovies, setSavedMovies]= useState([])
  const getSavedMovies = async () => {
    try {
      const data = await getDocs(savedCollectionRef);
      const filteredData = data.docs.map((each) => ({
        ...each.data(),
        id: each.id,
      }));
      setSavedMovies(filteredData);
      console.log(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

    
  return (
    <TrendsContext.Provider
      value={{
        trendsNavValue,
        setTrendsNavValue,
        moviesNavValue,
        setMoviesNavValue,
        genreList,
        setGenreList,
        getGenreList,
        saveState,
        setSaveState,
        savedMovies,
        getSavedMovies,
        setSavedMovies
      }}
    >
      {children}
    </TrendsContext.Provider>
  );
};

export default TrendsContextProvider;
