import React, { createContext, useContext, useState } from "react";

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

 
 
  //Getting the genre list from the api:--------------------
  const [genreList, setGenreList]= useState([])

  const getGenreList= (genreType)=>{
    fetch(
      `https://api.themoviedb.org/3/genre/${genreType}/list?api_key=7d62e932694fb115cc96edfa471eaf1a&language=en-US`
    )
      .then((response) => response.json())
      .then((data) => setGenreList(data.genres));
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
      }}
    >
      {children}
    </TrendsContext.Provider>
  );
};

export default TrendsContextProvider;
