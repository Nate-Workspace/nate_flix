import React from "react";
import "./moviesSort.css";
import { useTrendsContext } from "@/contexts/TrendsContextProvider";

const MoviesSort = () => {
  const { moviesNavValue, setMoviesNavValue } = useTrendsContext();
  return (
    <div className="sort-wrapper mt-16 mb-[-10px]">
      <div className="innerWidth flex justify-center items-center flex-col sort-container md:px-4">
        <span className="flex sm:gap-1 lg:gap-2 text-2xl sm: font-semibold lg:text-4xl md:text-3xl mb-[-5px]">
          <p>Discover More </p>
          {" "}
          <p className="text-red-500">
            {moviesNavValue === "Movies" ? " Movies" : " Tv Shows"}
          </p>
        </span>
        <span className="text-gray-300 mt-[-5px] text-center">
          Find movies that you enjoy watching! Explore from our wide database
        </span>
      </div>
    </div>
  );
};

export default MoviesSort;
