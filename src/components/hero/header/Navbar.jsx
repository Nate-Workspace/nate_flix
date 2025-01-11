import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./navbar.css";
import SearchBar from "../../../separateComps/searchBar/SearchBar";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate= useNavigate()
  const location = useLocation()

  const onNavClick = (active) => {
    if(active=="Home"){
      navigate('/')
    }else{
    navigate(`/${active.toLowerCase()}`)
  }
  };

  // console.log(activeNav);
  return (
    <div className="w-full flex flex-col nav-wrapper">
      <div className=" innerWidth paddings flexStart nav-container">
        <div className="nav-logo">
          <img src="./NATEflix.png" alt="logo" />
        </div>
        <div className=" flexBetween nav-right">

          {/* Navigation buttons---------------------- */}
          <div className="nav-middle">
            <span
              onClick={() => onNavClick("Home")}
              className={`${location.pathname == "/" ? "active" : ""}`}
            >
              Home
            </span>
            <span
              onClick={() => onNavClick("Movies")}
              className={`${location.pathname == "/movies" ? "active" : ""}`}
            >
              Movies
            </span>
            <span
              onClick={() => onNavClick("Series")}
              className={`${location.pathname == "/series" ? "active" : ""}`}
            >
              Series
            </span>
            <span
              onClick={() => onNavClick("Mylist")}
              className={`${location.pathname == "/mylist" ? "active" : ""}`}
            >
              My list
            </span>
          </div>
          {/* Navigation buttons------------------------ */}

          <SearchBar/>
          <div className="red-button">Log in</div>
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Navbar;
