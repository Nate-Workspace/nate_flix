import React from "react";
import { FaSearch } from "react-icons/fa";
import SearchBar from "../../../separateComps/searchBar/SearchBar";

const Herobody = () => {
  return (
    <div className="hero-wrapper h-full w-full flex ">
      <div className="innerWidth flexColCenter z-10">
        <div className="flexColCenter gap-4">
          <div className="w-40 mb-4">
            <img src="./NATEflix.png" alt="LOGO" className="w-60 md:w-80 lg:w-96 mb-4"/>
          </div>
          <div className="mt-2">
            <p className="text-gray-300 text-lg max-w-md text-center">
              Discover endless movies, TV shows, and more. Your next favorite
              thing is just a click away.
            </p>
          </div>
        </div>
        <div className="flexColCenter w-full g4 hero-bottom"></div>
      </div>
    </div>
  );
};

export default Herobody;
